<template>
  <div class="chatbot-container">
    <h2 class="chatbot-title">DSA Guru! 👨‍🏫</h2>
    <div class="chatbot-input-container">
      <input
        type="text"
        class="chatbot-input"
        v-model="userInput"
        placeholder="Ask me anything about DSA!"
        @keydown.enter="sendMessage"
      />
      <button class="chatbot-button" @click="sendMessage">Ask!</button>
    </div>
    <div class="chatbot-response">
      <div v-if="isLoading" class="loading-container">
        <span class="spinner"></span> Loading...
      </div>
      <div v-html="response"></div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  data() {
    return {
      userInput: '',
      response: '',
      isLoading: false,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput) {
        this.response = '<strong>Please enter a message.</strong>';
        return;
      }
      this.isLoading = true;
      this.response = '';

      try {
        const API_KEY = "AIzaSyCI_d1oVYu-IMLxps0GcLX4ZW3njRjsRFk";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: this.userInput }]
            }]
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error.message);

        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\\(.?)\\*/g, "$1").trim();
        this.response = marked.parse(apiResponseText || '<strong>No response received.</strong>');
      } catch (error) {
        this.response = '<strong>Error:</strong> ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.chatbot-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chatbot-title {
  text-align: center;
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
}

.chatbot-input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.chatbot-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

.chatbot-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.chatbot-button:hover {
  background-color: #45a049;
}

.chatbot-response {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 50px;
  color: #333;
}

.chatbot-response h3 {
  color: #333;
  font-size: 1.2em;
}

.chatbot-response strong {
  color: #d9534f;
}

.chatbot-response ul {
  padding-left: 20px;
}

.chatbot-response li {
  margin-bottom: 5px;
}

/* Spinner Styling */
.loading-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1em;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
