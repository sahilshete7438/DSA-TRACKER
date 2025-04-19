<template>
  <div class="binary-search-page">
    <header>
      <h1>DSA Tracker - BinarySearch</h1>
      <nav>
        <router-link to="/" class="red-button">Back to Home</router-link>
      </nav>
    </header>

    <div class="search-container">
      <a href="https://www.codechef.com/practice/course/binary-search/INTBINS01/problems/TRICOIN" target="_blank">
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
      <h2>Binary Search Topics</h2>

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
  name: 'BinarySearchPage',
  data() {
    return {
      searchQuery: "",
      topics: [
  {
    name: "Binary Search to find X in sorted array",
    completed: false,
    videoLink: "https://youtu.be/AZOmHuHadxQ?si=EAn74VUsXKzPAnSS",
    articleLink: "https://www.geeksforgeeks.org/binary-search/"
  },
  {
    name: "Implement Lower Bound",
    completed: false,
    videoLink: "https://youtu.be/6zhGS79oQ4k?si=FxwkjFdg9lF2orCO",
    articleLink: "https://www.geeksforgeeks.org/implement-lower-bound/"
  },
  {
    name: "Implement Upper Bound",
    completed: false,
    videoLink: "https://youtu.be/6zhGS79oQ4k?si=pX-_Dnv_4i3vBWvw",
    articleLink: "https://www.geeksforgeeks.org/implement-upper-bound/"
  },
  {
    name: "Search Insert Position",
    completed: false,
    videoLink: "https://youtu.be/0A40XJH_VvE?si=iVoLfNoKKg7OWe1b",
    articleLink: "https://www.geeksforgeeks.org/search-insert-position-of-k-in-a-sorted-array/"
  },
  {
    name: "Check if Input array is sorted",
    completed: false,
    videoLink: "https://youtu.be/aF9WrmuRrKU?si=Sa-2aJkeNmrDeGJm",
    articleLink: "https://www.geeksforgeeks.org/program-check-array-sorted-not-iterative-recursive/"
  },
  {
    name: "Find the first or last occurrence of a given number in a sorted array",
    completed: false,
    videoLink: "https://youtu.be/hjR1IYVx9lY?si=DmUT6QtX2MpII2fU",
    articleLink: "https://www.geeksforgeeks.org/find-first-and-last-positions-of-an-element-in-a-sorted-array/"
  },
  {
    name: "Count occurrences of a number in a sorted array with duplicates",
    completed: false,
    videoLink: "https://youtu.be/pLT_9jwaPLs?si=XVEN-c6JUvlwqHQ2",
    articleLink: "https://www.geeksforgeeks.org/count-number-of-occurrences-or-frequency-in-a-sorted-array/"
  },
  {
    name: "Find peak element",
    completed: false,
    videoLink: "https://youtu.be/cXxmbemS6XM?si=mouR5YWzphSvtjzS",
    articleLink: "https://www.geeksforgeeks.org/magical-indices-array/"
  },
  {
    name: "Search in Rotated Sorted Array I",
    completed: false,
    videoLink: "https://youtu.be/5qGrJbHhqFs?si=acR0oFhrRVDz2lKx",
    articleLink: "https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1"
  },
  {
    name: "Search in Rotated Sorted Array II",
    completed: false,
    videoLink: "https://youtu.be/w2G2W8l__pc?si=FAYasMShrWyG-9xr",
    articleLink: "https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/"
  },
  {
    name: "Find minimum in Rotated Sorted Array",
    completed: false,
    videoLink: "https://youtu.be/nhEMDKMB44g?si=EvNAr-Rb5YRORMIB",
    articleLink: "https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/"
  },
  {
    name: "Single element in a Sorted Array",
    completed: false,
    videoLink: "https://youtu.be/AZOmHuHadxQ?si=gN1pR190MOLZdFeP",
    articleLink: "https://www.geeksforgeeks.org/problems/find-the-element-that-appears-once-in-sorted-array0624/1"
  },
  {
    name: "Find kth element of two sorted arrays",
    completed: false,
    videoLink: "https://youtu.be/D1oDwWCq50g?si=K03onMRxzoRtdEyM",
    articleLink: "https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/"
  },
  {
    name: "Find out how many times an array has been rotated",
    completed: false,
    videoLink: "https://youtu.be/jtSiWTPLwd0?si=Z1wqhaz57bykkg34",
    articleLink: "https://www.geeksforgeeks.org/find-rotation-count-rotated-sorted-array/"
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
.binary-search-page {
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