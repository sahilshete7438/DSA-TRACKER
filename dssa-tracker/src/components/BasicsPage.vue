<template>
  <div class="basics-page">
    <header>
      <h1>DSA Tracker</h1>
       <nav>
    <router-link to="/" class="red-button">Back to Home</router-link>
  </nav>
    </header>

    <div class="search-container">
     <a href="https://www.codechef.com/practice/course/java/LPJAAS01/problems/LJAAS01" target="_blank">
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
      <h2>Step 1. Things to know in C++ / Java / Python or any language</h2>

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
  data() {
    return {
      searchQuery: "",
      topics: [
        { name: "User Input/Output", completed: false, videoLink: "https://youtu.be/1Wrc91mp980?si=4fvNN8X3sD6vPtAh", articleLink: "https://www.geeksforgeeks.org/basic-input-and-output-in-c/" },
        { name: "Data Types", completed: false, videoLink: "https://youtu.be/sARaqR0hRI4?si=4N-UrqotXwubRzLp", articleLink: "https://www.geeksforgeeks.org/data-types-in-c/" },
        { name: "If Else Statements", completed: false, videoLink: "https://youtu.be/K8mntKyBJGc?si=LgFixit2hzuhytFq", articleLink: "https://www.geeksforgeeks.org/c-if-else-statement/" },
        { name: "Switch Statement", completed: false, videoLink: "https://youtu.be/E8weUIY2-iw?si=DYZjAJssnCSLCqeT", articleLink: "https://www.geeksforgeeks.org/c-switch-statement/" },
        { name: "What are arrays, strings?", completed: false, videoLink: "https://youtu.be/AefKSoNpZtQ?si=-Cfu9IJdA5qYz7ig", articleLink: "https://www.geeksforgeeks.org/string-arrays-in-java/" },
        { name: "For loops", completed: false, videoLink: "https://youtu.be/Xtl1oGtcX-8?si=WcJ4pLqB9KRvvrJ0", articleLink: "https://www.geeksforgeeks.org/c-for-loop/" },
        { name: "while loops", completed: false, videoLink: "https://youtu.be/WgS_SF1VrEk?si=EC1OGv07GtKvuET6", articleLink: "https://www.geeksforgeeks.org/c-while-loop/" },
        { name: "Functions(pass by reference)", completed: false, videoLink: "https://youtu.be/6R0jNW6j2NA?si=-1Oa1jTj0uyqw2f3", articleLink: "https://www.geeksforgeeks.org/cpp-functions-pass-by-reference/" },
        { name: "Time Complexity", completed: false, videoLink: "https://youtu.be/vgSKOMsjLbc?si=vtNDOf-eNBa_zsk_", articleLink: "https://www.geeksforgeeks.org/time-complexity-and-space-complexity/" },

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
.basics-page {
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