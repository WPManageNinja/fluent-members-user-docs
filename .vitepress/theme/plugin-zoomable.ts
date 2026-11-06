import type { MarkdownRenderer } from 'vitepress'

/** Escape for HTML attribute value to avoid broken markup and XSS. */
function escapeAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Only srcs that need no bundler rewriting are handed to <ZoomableImage>:
 * absolute public-dir paths (/images/...), full URLs, and data URIs.
 * A relative src (./shot.png) is left to the default renderer so Vite can
 * still resolve and fingerprint it — passing it through as a Vue prop
 * would ship the raw path and break the image in the production build.
 */
function isSafeSrc(src: string): boolean {
  return /^(\/|https?:\/\/|data:)/.test(src)
}

export function zoomablePlugin(md: MarkdownRenderer) {
  const defaultRender =
    md.renderer.rules.image ||
    ((tokens, idx, options, env, self) => {
      return self.renderToken(tokens, idx, options)
    })

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (!token.attrs) return defaultRender(tokens, idx, options, env, self)

    const srcIndex = token.attrIndex('src')
    if (srcIndex < 0) return defaultRender(tokens, idx, options, env, self)

    const src = token.attrs[srcIndex][1]
    if (!isSafeSrc(src)) return defaultRender(tokens, idx, options, env, self)

    const alt = token.content || ''

    // Use explicit closing tag with the image inside as a child element
    // This ensures SSR and client rendering produce the exact same HTML
    // The wrapper div creates a proper block boundary
    return `<ClientOnly><ZoomableImage src="${escapeAttr(src)}" alt="${escapeAttr(alt)}"></ZoomableImage></ClientOnly>`
  }
}
