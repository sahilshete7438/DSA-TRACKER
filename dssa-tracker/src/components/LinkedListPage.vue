<template>
  <div class="linked-list-page">
    <header>
      <h1>DSA Tracker</h1>
      <nav>
        <router-link to="/" class="red-button">Back to Home</router-link>
      </nav>
    </header>

    <div class="search-container">
      <a href="https://www.codechef.com/practice/course/linked-lists/LINKLISTF/problems/PREP55" target="_blank">
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
      <h2>Linked List Topics</h2>

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
  name: 'LinkedListPage',
  data() {
    return {
      searchQuery: "",
     topics: [
   {
    name: "Introduction to LinkedList learn about struct and how a node is represented",
    completed: false,
    videoLink: "https://youtu.be/oAja8-Ulz6o?si=mpZXH9ExqmsZHz7k",
    articleLink: "https://www.geeksforgeeks.org/linked-list-data-structure/"
  },
  {
    name: "Inserting a node in LinkedList",
    completed: false,
    videoLink: "https://youtu.be/jgqg6Qw68_Q?si=YNp50JcGlMEoN3En",
    articleLink: "https://www.geeksforgeeks.org/problems/linked-list-insertion-1587115620/0"
  },
  {
    name: "Deleting a node in LinkedList",
    completed: false,
    videoLink: "https://youtu.be/SbGRuk38MvI?si=oRlldQgxbo_lQ52n",
    articleLink: "https://www.geeksforgeeks.org/problems/delete-a-node-in-single-linked-list/1"
  },
  {
    name: "Find the length of the LinkedList",
    completed: false,
    videoLink: "https://youtu.be/_NqD7UKbR7Q?si=WJS0jx5F_g0Q4k9p",
    articleLink: "https://www.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/"
  },
  {
    name: "Search an element in the LinkedList",
    completed: false,
    videoLink: "https://youtu.be/a3V0Q5lEZKg?si=WtVC52Rq7QFFV0bl",
    articleLink: "https://www.geeksforgeeks.org/problems/search-in-linked-list-1664434326/0"
  },
  {
    name: "Introduction to DLL learn about struct and how a node is represented",
    completed: false,
    videoLink: "https://youtu.be/nquQ_fYGGA4?si=4WI2rme0Hs50eia7",
    articleLink: "https://www.geeksforgeeks.org/doubly-linked-list/"
  },
  {
    name: "Insert a node in DLL",
    completed: false,
    videoLink: "https://youtu.be/le9RuwN2sQg?si=CuvvYIJeC9tSHDM5",
    articleLink: "https://www.geeksforgeeks.org/problems/insert-a-node-in-doubly-linked-list/0"
  },
  {
    name: "Delete a node in DLL",
    completed: false,
    videoLink: "https://youtu.be/4ZOk5g67Lzg?si=bDPr82PIB12PcO6x",
    articleLink: "https://www.geeksforgeeks.org/problems/delete-node-in-doubly-linked-list/1"
  },
  {
    name: "Reverse a DLL",
    completed: false,
    videoLink: "https://youtu.be/u3WUW2qe6ww?si=MjI-JunGI2ue7sO0",
    articleLink: "https://www.geeksforgeeks.org/reverse-a-doubly-linked-list/"
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
.linked-list-page {
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