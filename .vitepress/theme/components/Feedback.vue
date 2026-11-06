<script setup>
import { reactive, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

// --- CONFIGURATION ---
// Paste your Google Web App URL here
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQPG7SqKCME-siL3xkDqOwCJ1WHOGuZCQZnZO0-7GgYACxeb6lNT1mjpvkJXrG0QxbqQ/exec'
// 2. PRODUCT NAME for each product repo (e.g. 'FluentCRM', 'FluentForms')
const PRODUCT_NAME = 'fluent-members-user-docs'
// ---------------------

const { page } = useData()
const route = useRoute()

const state = reactive({
  vote: null,        // 'yes' | 'no'
  showComment: false,
  comment: '',
  sent: false,       // a comment has been submitted
  sending: false
})

// Watch for changes in the URL path.
// If the user goes to a new page, reset the widget.
watch(() => route.path, () => {
  state.vote = null
  state.showComment = false
  state.comment = ''
  state.sent = false
  state.sending = false
})

const send = async (payload) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Essential for skipping CORS checks
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        product: PRODUCT_NAME,
        path: route.path,
        title: page.value.title,
        ...payload
      })
    })
    return true
  } catch (e) {
    console.error('Feedback Error:', e)
    return false
  }
}

const submitVote = async (vote) => {
  if (state.sending) return
  state.sending = true
  state.vote = vote
  await send({ vote })
  state.sending = false
}

const submitComment = async () => {
  if (state.sending || !state.comment.trim()) return
  state.sending = true
  // NOTE: the Apps Script writes `data.message` to column F — the key must be `message`.
  const ok = await send({ vote: state.vote, message: state.comment.trim() })
  state.sending = false
  if (ok) {
    state.sent = true
    state.showComment = false
    state.comment = ''
  }
}
</script>

<template>
  <div class="feedback-wrapper">
    <div class="feedback-card">
      <p class="feedback-title">Was this page helpful?</p>

      <div class="feedback-buttons">
        <button
          class="fb-btn"
          :class="{ active: state.vote === 'yes' }"
          :disabled="state.sending"
          @click="submitVote('yes')"
        >
          👍 Yes
        </button>
        <button
          class="fb-btn"
          :class="{ active: state.vote === 'no' }"
          :disabled="state.sending"
          @click="submitVote('no')"
        >
          👎 No
        </button>
        <button
          class="fb-btn"
          :class="{ active: state.showComment }"
          :disabled="state.sent"
          @click="state.showComment = !state.showComment"
        >
          💬 {{ state.showComment ? 'Close' : 'Feedback' }}
        </button>
      </div>

      <div v-if="state.showComment" class="feedback-form">
        <textarea
          v-model="state.comment"
          class="fb-textarea"
          rows="4"
          placeholder="How can we improve this specific page?"
        ></textarea>
        <button
          class="fb-send"
          :disabled="state.sending || !state.comment.trim()"
          @click="submitComment"
        >
          {{ state.sending ? 'Sending…' : 'Send Feedback' }}
        </button>
      </div>

      <p v-else-if="state.sent || state.vote" class="feedback-thanks">
        Thanks for your feedback! 💜
      </p>
    </div>
  </div>
</template>

<style scoped>
.feedback-wrapper {
  margin-top: 3rem;
}

.feedback-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 24px 20px;
  text-align: center;
}

.feedback-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.feedback-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.fb-btn {
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 9px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  line-height: 1.4;
  transition: border-color 0.2s, color 0.2s, background-color 0.2s;
}

.fb-btn:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
}

.fb-btn.active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fb-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.feedback-form {
  margin-top: 16px;
}

.fb-textarea {
  display: block;
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding: 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 15px;
  line-height: 1.6;
  resize: vertical;
}

.fb-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.fb-send {
  margin-top: 16px;
  border: 1px solid var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 15px;
  font-weight: 600;
  padding: 11px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.fb-send:hover:not(:disabled) {
  opacity: 0.85;
}

.fb-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback-thanks {
  margin: 16px 0 0;
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .feedback-card {
    padding: 20px 14px;
  }

  .feedback-title {
    font-size: 18px;
  }
}
</style>
