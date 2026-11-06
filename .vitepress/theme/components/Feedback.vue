<script setup>
import { reactive, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

// --- CONFIGURATION ---
// 1. Google Web App URL (shared feedback collector; rows are keyed by PRODUCT_NAME).
//    Replace with a dedicated endpoint if this project should log to its own sheet.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQPG7SqKCME-siL3xkDqOwCJ1WHOGuZCQZnZO0-7GgYACxeb6lNT1mjpvkJXrG0QxbqQ/exec'
// 2. PRODUCT NAME for this docs repo.
const PRODUCT_NAME = 'fluent-members-user-docs'
// ---------------------

const { page } = useData()
const route = useRoute()

const state = reactive({
  voted: false,
  voting: false,
  showFeedback: false,
  feedbackText: ''
})

// Reset the widget whenever the user navigates to a new page.
watch(() => route.path, () => {
  state.voted = false
  state.voting = false
  state.showFeedback = false
  state.feedbackText = ''
})

const toggleFeedback = () => {
  state.showFeedback = !state.showFeedback
}

const submitFeedback = async (vote, feedback = '') => {
  state.voting = true

  const payload = JSON.stringify({
    product: PRODUCT_NAME,
    path: route.path,
    title: page.value.title,
    vote: vote,
    message: feedback // Apps Script writes data.message to Column F
  })

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Essential for skipping CORS checks
      headers: { 'Content-Type': 'text/plain' },
      body: payload
    })
    state.voted = true
  } catch (e) {
    console.error('Feedback Error:', e)
  } finally {
    state.voting = false
  }
}

const sendWrittenFeedback = () => {
  const text = state.feedbackText.trim()
  if (!text) return
  submitFeedback('feedback', text)
}
</script>

<template>
  <div class="feedback-wrapper">
    <div v-if="!state.voted" class="feedback-card">
      <p class="feedback-title">Was this page helpful?</p>

      <div class="feedback-buttons">
        <button @click="submitFeedback('yes')" :disabled="state.voting" class="fb-btn">
          👍 Yes
        </button>
        <button @click="submitFeedback('no')" :disabled="state.voting" class="fb-btn">
          👎 No
        </button>
        <button
          @click="toggleFeedback"
          :disabled="state.voting"
          class="fb-btn"
          :class="{ 'is-active': state.showFeedback }"
        >
          💬 {{ state.showFeedback ? 'Close' : 'Feedback' }}
        </button>
      </div>

      <div v-if="state.showFeedback" class="feedback-form">
        <textarea
          v-model="state.feedbackText"
          class="fb-textarea"
          rows="3"
          placeholder="How can we improve this specific page?"
        ></textarea>
        <button
          @click="sendWrittenFeedback"
          :disabled="state.voting || !state.feedbackText.trim()"
          class="fb-send"
        >
          Send Feedback
        </button>
      </div>
    </div>

    <div v-else class="feedback-thanks">
      Thanks for your feedback! 💜
    </div>
  </div>
</template>

<style scoped>
.feedback-wrapper {
  margin: 3rem 0 1rem;
}

.feedback-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 24px 20px;
  text-align: center;
}

.feedback-title {
  margin: 0 0 1rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.feedback-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.fb-btn {
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.4;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.fb-btn:hover:not(:disabled) {
  background-color: var(--vp-c-bg-mute);
}

.fb-btn.is-active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fb-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.feedback-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.fb-textarea {
  width: 100%;
  max-width: 520px;
  min-height: 90px;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s;
}

.fb-textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.fb-send {
  border: none;
  background-color: var(--vp-c-brand-1);
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s, opacity 0.2s;
}

.fb-send:hover:not(:disabled) {
  background-color: var(--vp-c-brand-2);
}

.fb-send:disabled {
  opacity: 0.6;
  cursor: default;
}

.feedback-thanks {
  margin: 3rem 0 1rem;
  padding: 24px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  text-align: center;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
</style>
