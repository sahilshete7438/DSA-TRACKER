<template>
  <div class="stack-page">
    <header>
      <h1>DSA Tracker</h1>
      <nav>
        <router-link to="/" class="red-button">Back to Home</router-link>
      </nav>
    </header>

    <div class="search-container">
      <a href="https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/PREP59" target="_blank">
        <button class="mcq-button">MCQ</button>
      </a>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search Questions..."
        class="search-bar"
      />
      <span class="progress">{{ completedCount }}/{{ topics.length }} Done</span>
    </div>

    <section class="topic-section">
      <h2>Stack and Queue Topics</h2>

      <div
        v-for="(topic, index) in filteredTopics"
        :key="index"
        class="topic-item"
      >
        <input
          type="checkbox"
          :id="'topic-' + index"
          v-model="topic.completed"
          @change="updateProgress(topic)"
        />
        <label
          :for="'topic-' + index"
          :class="{ completed: topic.completed }"
        >
          {{ topic.name }}
        </label>

        <div class="resource-buttons">
          <a :href="topic.videoLink" target="_blank" class="youtube-button">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
              alt="YouTube"
            />
          </a>
          <a :href="topic.articleLink" target="_blank" class="geeksforgeeks-button">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
              alt="GeeksForGeeks"
            />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StackPage',
  data() {
    return {
      searchQuery: "",
      topics: [
        {
    name: "Implement Stack using Arrays",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=MD3mFgFwqBE",
    articleLink: "https://www.geeksforgeeks.org/problems/implement-stack-using-array/1"
  },
  {
    name: "Implement Queue using Arrays",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=okr-XE8yTO8",
    articleLink: "https://www.geeksforgeeks.org/array-implementation-of-queue-simple/"
  },
  {
    name: "Implement Stack using Queue",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=jDZQKzEtbYQ",
    articleLink: "https://www.geeksforgeeks.org/implement-stack-using-queue/"
  },
  {
    name: "Implement Queue using Stack",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=3Et9MrMc02A",
    articleLink: "https://www.geeksforgeeks.org/implement-stack-using-queue/"
  },
  {
    name: "Implement Stack using LinkedList",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=wjI1WNcIntg",
    articleLink: "https://www.geeksforgeeks.org/problems/implement-stack-using-linked-list/1"
  },
  {
    name: "Implement Queue using LinkedList",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=okr-XE8yTO8",
    articleLink: "https://www.geeksforgeeks.org/problems/implement-queue-using-linked-list/1"
  },
  {
    name: "Check for balanced Parenthesis",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=QZOLb0xHB_Q",
    articleLink: "https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1"
  },
  {
    name: "Implement Min Stack",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=ZvaRHYYI0-4",
    articleLink: "https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1"
  },
  {
    name: "Infix to Postfix Conversion using Stack",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=vq-nUF0G4fI",
    articleLink: "https://www.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1"
  },
  {
    name: "Prefix to Infix Conversion",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=1zqgyoZzda4",
    articleLink: "https://www.geeksforgeeks.org/problems/prefix-to-infix-conversion/0"
  },
  {
    name: "Prefix to Postfix Conversion",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=PAceaOSnxQs",
    articleLink: "https://www.geeksforgeeks.org/problems/prefix-to-postfix-conversion/0"
  },
  {
    name: "Postfix to Prefix Conversion",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=1zqgyoZzda4",
    articleLink: "https://www.geeksforgeeks.org/problems/postfix-to-prefix-conversion/0"
  },
  {
    name: "Postfix to Infix Conversion",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=1zqgyoZzda4",
    articleLink: "https://www.geeksforgeeks.org/problems/postfix-to-infix-conversion/0"
  },
  {
    name: "Convert Infix to Prefix Notation",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=8QxlrRws9OI",
    articleLink: "https://www.geeksforgeeks.org/problems/postfix-to-infix-conversion/0"
  }
      ],
    };
  },
  computed: {
    filteredTopics() {
      return this.topics.filter((topic) =>
        topic.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    completedCount() {
      return this.topics.filter((topic) => topic.completed).length;
    },
  },
  methods: {
    async updateProgress(topic) {
      try {
        if (topic.completed) {
          // Add the topic to completed topics
          await axios.post('http://localhost:5000/update-topics', {
            username: this.$root.loggedInUser,
            completedTopics: [topic.name]
          });
        } else {
          // Remove the topic from completed topics
          await axios.post('http://localhost:5000/remove-topic', {
            username: this.$root.loggedInUser,
            topicName: topic.name
          });
        }
      } catch (err) {
        console.error('Error updating topics:', err);
      }
    },
    async fetchCompletedTopics() {
      if (this.$root.loggedInUser) {
        try {
          const response = await axios.get(`http://localhost:5000/user/${this.$root.loggedInUser}`);
          const completedTopics = response.data.completedTopics;
          this.topics.forEach(topic => {
            topic.completed = completedTopics.includes(topic.name);
          });
        } catch (err) {
          console.error('Error fetching completed topics:', err);
        }
      }
    }
  },
  mounted() {
    this.fetchCompletedTopics();
  }
};
</script>

<style scoped>
.stack-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5em;
  color: #333;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

.search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.mcq-button {
  background-color: #ffca28;
  color: black;
  border: none;
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
}

.search-bar {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.progress {
  margin-left: 10px;
  color: #28a745;
  font-weight: bold;
}

.topic-section {
  margin-top: 30px;
}

.topic-item {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.topic-item input {
  margin-right: 10px;
}

label {
  font-size: 16px;
  cursor: pointer;
}

label.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.resource-buttons {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.youtube-button img,
.geeksforgeeks-button img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  cursor: pointer;
}

.red-button {
  color: white;
  background-color: #007BFF;
  padding: 10px 5px;
  text-decoration: none;
  border-radius: 6px;
}

.red-button:hover {
  background-color: darkred;
}
</style>