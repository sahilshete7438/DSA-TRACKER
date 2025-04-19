<template>
  <div class="bit-manipulation-page">
    <header>
      <h1>DSA Tracker</h1>
      <nav>
        <router-link to="/" class="red-button">Back to Home</router-link>
      </nav>
    </header>

    <div class="search-container">
      <a href="https://www.codechef.com/learn/course/bit-manipulation/BITM02/problems/BTM21" target="_blank">
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
      <h2>Bit Manipulation Topics</h2>

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
  name: 'BitManipulationPage',
  data() {
    return {
      searchQuery: "",
      topics: [
        {
    name: "Introduction to Bit Manipulation [Theory]",
    completed: false,
    videoLink: "https://youtu.be/qQd-ViW7bfk?si=hZ5W8C5n1VbyWeyC",
    articleLink: "https://www.geeksforgeeks.org/all-about-bit-manipulation/"
  },
  {
    name: "Check if the i-th bit is set or not",
    completed: false,
    videoLink: "https://youtu.be/Ca169LO3H-Y?si=AtIraOXf9QNk6d41",
    articleLink: "https://www.geeksforgeeks.org/toggle-bits-given-range-using-javascript/"
  },
  {
    name: "Check if a number is odd or not",
    completed: false,
    videoLink: "https://youtu.be/YmMfLboAzcw?si=IVMfNVio_tRU9Qym",
    articleLink: "https://www.geeksforgeeks.org/javascript-program-to-check-if-a-number-is-odd-or-even/"
  },
  {
    name: "Check if a number is power of 2 or not",
    completed: false,
    videoLink: "https://youtu.be/I80Ovvi_nRU?si=YGOM_-kABcQn9aaW",
    articleLink: "https://www.geeksforgeeks.org/problems/power-of-2-1587115620/1"
  },
  {
    name: "Count the number of set bits",
    completed: false,
    videoLink: "https://youtu.be/KJnhAUkxAho?si=wT2hcPItxzeFvnR4",
    articleLink: "https://www.geeksforgeeks.org/count-total-set-bits-in-all-numbers-from-1-to-n/"
  },
  {
    name: "Set/Unset the rightmost unset bit",
    completed: false,
    videoLink: "https://youtu.be/raYgCcAGduU?si=PbAOiL7oYG7kHztT",
    articleLink: "https://www.geeksforgeeks.org/problems/set-the-rightmost-unset-bit4436/0"
  },
  {
    name: "Swap two numbers",
    completed: false,
    videoLink: "https://youtu.be/Ff4XVX_h0KU?si=8bpgv7WQZZaRaeEP",
    articleLink: "https://www.geeksforgeeks.org/problems/swap-two-numbers3844/1"
  },
  {
    name: "Divide two integers without using multiplication, division, and mod operator",
    completed: false,
    videoLink: "https://youtu.be/FrOyj_DKne4?si=km32XVRIrHlsp4DU",
    articleLink: "https://www.geeksforgeeks.org/divide-two-integers-without-using-multiplication-division-mod-operator/"
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
.bit-manipulation-page {
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