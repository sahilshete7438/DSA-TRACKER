<template>
  <div class="strings-page">
    <header>
      <h1>DSA Tracker</h1>
      <nav>
        <router-link to="/" class="red-button">Back to Home</router-link>
      </nav>
    </header>

    <div class="search-container">
      <a href="https://www.codechef.com/practice/course/strings/STRINGS/problems/DNASTORAGE" target="_blank">
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
      <h2>String Topics</h2>

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
  name: 'StringsPage',
  data() {
    return {
      searchQuery: "",
      topics: [
  {
    name: "Remove outermost Parenthesis",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=I0osO1BqiGw",
    articleLink: "https://www.geeksforgeeks.org/problems/outermost-parentheses/0"
  },
  {
    name: "Reverse words in a given string / Palindrome Check",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=Ke8TPhHdHMw",
    articleLink: "https://www.geeksforgeeks.org/reverse-words-in-a-given-string/"
  },
  {
    name: "Largest odd number in a string",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=vkxUVdGgnhU",
    articleLink: "https://www.geeksforgeeks.org/find-the-largest-odd-number-in-string/"
  },
  {
    name: "Longest Common Prefix",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=vkxUVdGgnhU",
    articleLink: "https://www.geeksforgeeks.org/problems/longest-common-prefix-in-anarray5129/1"
  },
  {
    name: "Isomorphic String",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=2ISNCDJEgqQ",
    articleLink: "https://www.geeksforgeeks.org/problems/isomorphic-strings-1587115620/1"
  },
  {
    name: "Check whether one string is a rotation of another",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=dlt9Gyq6rb0",
    articleLink: "https://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other/"
  },
  {
    name: "Sort Characters by Frequency",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=5GSJirmVxrI",
    articleLink: "https://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other/"
  },
  {
    name: "Maximum Nesting Depth of Parenthesis",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=kUp-gqHzk6c",
    articleLink: "https://www.geeksforgeeks.org/find-maximum-depth-nested-parenthesis-string/"
  },
  {
    name: "Roman Number to Integer and vice versa",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=3jdxYj3DD98",
    articleLink: "https://www.geeksforgeeks.org/problems/roman-number-to-integer3201/1"
  },
  {
    name: "Implement Atoi",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=qZoFJKyHQ98",
    articleLink: "https://www.geeksforgeeks.org/problems/implement-atoi/1"
  },
  {
    name: "Count Number of Substrings",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=Yg5a2FxU4Fo",
    articleLink: "https://www.geeksforgeeks.org/given-binary-string-count-number-substrings-start-end-1/"
  },
  {
    name: "Longest Palindromic Substring (Do it without DP)",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=XYQecbcd6_c",
    articleLink: "https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1"
  },
  {
    name: "Sum of Beauty of all Substrings",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=SpEuYAAX0Yk",
    articleLink: "https://www.geeksforgeeks.org/sum-of-all-substrings-of-a-string-representing-a-number/"
  },
  {
    name: "Reverse Every Word in a String",
    completed: false,
    videoLink: "https://www.youtube.com/watch?v=Ke8TPhHdHMw",
    articleLink: "https://www.geeksforgeeks.org/reverse-individual-words/"
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
.strings-page {
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