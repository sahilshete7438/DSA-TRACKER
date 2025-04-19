<template>
  <div class="sorting-page">
    <header>
      <h1>DSA Tracker - Array Problems</h1>
      <nav>
        <router-link to="/">Back to Home</router-link>
      </nav>
    </header>

    <div class="search-container">

    <button class="mcq-button">MCQ</button>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search Array Problems..."
        class="search-bar"
      />
      <span class="progress">{{ completedCount }}/{{ topics.length }} Done</span>
    </div>

    <section class="topic-section">
      <h2>Array Problems</h2>

      <div
        v-for="(topic, index) in filteredTopics"
        :key="index"
        class="topic-item"
      >
        <input
          type="checkbox"
          :id="'array-topic-' + index"
          v-model="topic.completed"
          @change="updateProgress(topic)"
        />
        <label
          :for="'array-topic-' + index"
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
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      searchQuery: "",
      topics: [
  // Step 1: Easy
  { name: "Largest Element in an Array", completed: false, videoLink: "https://youtu.be/QYTESxvQZ-k?si=EYHE2bL2fiTZUohB", articleLink: "https://www.geeksforgeeks.org/problems/largest-element-in-array4009/1" },
  { name: "Second Largest Element in an Array without sorting", completed: false, videoLink: "https://youtu.be/k__ZO0e1OHQ?si=bGFueerLqvpYtnDY", articleLink: "https://www.geeksforgeeks.org/find-second-largest-element-array/" },
  { name: "Check if the array is sorted", completed: false, videoLink: "https://youtu.be/37E9ckMDdTk?si=eREF72no3fOxCHyZ", articleLink: "https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1" },
  { name: "Remove duplicates from Sorted array", completed: false, videoLink: "https://youtu.be/gf7vdIin0dk?si=ra4ICWEthu4yumm2", articleLink: "https://www.geeksforgeeks.org/problems/remove-duplicate-elements-from-sorted-array/1" },
  { name: "Left Rotate an array by one place", completed: false, videoLink: "https://youtu.be/X52mmyGG7Ec?si=avfhKKVTdKPMK-_E", articleLink: "https://www.geeksforgeeks.org/array-rotation/" },
  { name: "Left rotate an array by D places", completed: false, videoLink: "https://youtu.be/fM__aWY5Dx0?si=FmfcC1wWSo9NjUm2", articleLink: "https://www.geeksforgeeks.org/array-rotation/" },
  { name: "Move Zeros to end", completed: false, videoLink: "https://youtu.be/wvcQg43_V8U?si=Utx4ojEgneByebXh&t=1631", articleLink: "https://www.geeksforgeeks.org/move-zeroes-end-array/" },
  { name: "Linear Search", completed: false, videoLink: "https://youtu.be/C46QfTjVCNU?si=qtlbVjl6FKRAUnT6", articleLink: "https://www.geeksforgeeks.org/linear-search/" },
  { name: "Find the Union and intersection of two sorted arrays", completed: false, videoLink: "https://youtu.be/EQQp4B_CU5Q?si=km_496BRMl7fhFg0", articleLink: "https://www.geeksforgeeks.org/union-and-intersection-of-two-sorted-arrays-2/" },
  { name: "Find missing number in an array", completed: false, videoLink: "https://youtu.be/6KHW7ZQwtCA?si=5_y-7IE4BQGklK9a", articleLink: "https://www.geeksforgeeks.org/find-the-missing-number/" },
  { name: "Maximum Consecutive Ones", completed: false, videoLink: "https://youtu.be/3E4JBHSLpYk?si=nHUqUPx8Dpzy8jDd", articleLink: "https://www.geeksforgeeks.org/maximum-consecutive-ones-or-zeros-in-a-binary-array/" },
  { name: "Subarray with given sum", completed: false, videoLink: "https://youtu.be/Ofl4KgFhLsM?si=Sxvm50HTuVeVpdWf", articleLink: "https://www.geeksforgeeks.org/find-subarray-with-given-sum/" },
  { name: "Find the Missing Number", completed: false, videoLink: "https://youtu.be/6KHW7ZQwtCA?si=wcRpbPDzKhHYyTMU", articleLink: "https://www.geeksforgeeks.org/find-the-missing-number/" },
  { name: "Find the number that appears once, and other numbers twice", completed: false, videoLink: "https://youtu.be/C8o_CLCxohk?si=d3u3vpYoy9807P8v", articleLink: "https://www.geeksforgeeks.org/find-element-appears-array-every-element-appears-twice/" },
  { name: "Search an element in a 2D matrix", completed: false, videoLink: "https://youtu.be/JXU4Akft7yk?si=j4svylwTG9GLXJH2", articleLink: "https://www.geeksforgeeks.org/search-in-row-wise-and-column-wise-sorted-matrix/" },
  { name: "Find the row with maximum number of 1’s", completed: false, videoLink: "https://youtu.be/SCz-1TtYxDI?si=y_BnztxKpboAU_i7", articleLink: "https://www.geeksforgeeks.org/find-the-row-with-maximum-number-1s/" },

  // Step 2: Medium
  { name: "2Sum Problem", completed: false, videoLink: "https://youtu.be/UXDSeD9mN-k?si=NXpz7K3IZhOjPhV_", articleLink: "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/" },
  { name: "Sort an array of 0’s 1’s and 2’s", completed: false, videoLink: "https://youtu.be/tp8JIuCXBaU?si=2VMG5mAFFnCAgC7K", articleLink: "https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/" },
  { name: "Majority Element (>n/2 times)", completed: false, videoLink: "https://youtu.be/nP_ns3uSh80?si=q0GlIhQuclrF17GN", articleLink: "https://www.geeksforgeeks.org/majority-element/" },
  { name: "Kadane’s Algorithm, maximum subarray sum", completed: false, videoLink: "https://youtu.be/AHZpyENo7k4?si=-vM8_-4SNYWH8rHL", articleLink: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/" },
  { name: "Print subarray with maximum subarray sum (extended version of above problem)", completed: false, videoLink: "https://youtu.be/AHZpyENo7k4?si=m-kfihHR9pYJKr7T", articleLink: "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/" },
  { name: "Stock Buy and Sell", completed: false, videoLink: "https://youtu.be/WBzZCm46mFo?si=-paGpRwRIaFlxQgx", articleLink: "https://www.geeksforgeeks.org/stock-buy-sell/" },
  { name: "Rearrange the array in alternating positive and negative items", completed: false, videoLink: "https://youtu.be/h4aBagy4Uok?si=d53c3E_USDL-2Nvy", articleLink: "https://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/" },
  { name: "Next Permutation", completed: false, videoLink: "https://youtu.be/JDOXKqF60RQ?si=vZ6F7KBbkax16JBN", articleLink: "https://www.geeksforgeeks.org/next-permutation/" },
  { name: "Leaders in an Array problem", completed: false, videoLink: "https://youtu.be/SnU0xiQ_jJ0?si=ykueJugSVSEHlaCB", articleLink: "https://www.geeksforgeeks.org/leaders-in-an-array/" },
  { name: "Longest Consecutive Sequence in an Array", completed: false, videoLink: "https://youtu.be/oO5uLE7EUlM?si=4QAzsjIvsgMxKbxa", articleLink: "https://www.geeksforgeeks.org/longest-consecutive-subsequence/" },
  { name: "Set Matrix Zeros", completed: false, videoLink: "https://youtu.be/N0MgLvceX7M?si=FWfIrSRNbp8MAb0S", articleLink: "https://www.geeksforgeeks.org/set-matrix-rows-and-columns-to-zeroes/" },
  { name: "Rotate Matrix by 90 degrees", completed: false, videoLink: "https://youtu.be/Z0R2u6gd3GU?si=mjLn7kVuuIKUHsgC", articleLink: "https://www.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1" },
  { name: "Print the matrix in spiral manner", completed: false, videoLink: "https://youtu.be/3Zv-s9UUrFM?si=KjvIkXdoumaXRYhw", articleLink: "https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/" },

  // Step 3: Hard
  { name: "Pascal’s Triangle", completed: false, videoLink: "https://youtu.be/bR7mQgwQ_o8?si=2jU17mib8RTg4nHS", articleLink: "https://www.geeksforgeeks.org/problems/pascal-triangle0652/1" },
  { name: "Majority Element (n/3 times)", completed: false, videoLink: "https://youtu.be/vwZj1K0e9U8?si=BVvyRXP0eP9hynkg", articleLink: "https://www.geeksforgeeks.org/majority-element/" },
  { name: "3-Sum Problem", completed: false, videoLink: "https://youtu.be/DhFh8Kw7ymk?si=Qm3PokAakWnV-ERn", articleLink: "https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/" },
  { name: "4-Sum Problem", completed: false, videoLink: "https://youtu.be/eD95WRfh81c?si=cIsTnm9OvvsyU72p", articleLink: "https://www.geeksforgeeks.org/find-four-elements-that-sum-to-a-given-value-set-2/" },
  { name: "Largest Subarray with 0 Sum", completed: false, videoLink: "https://youtu.be/xmguZ6GbatA?si=a6QmcCHqNUC4q-vg", articleLink: "https://www.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1" },
  { name: "Count number of subarrays with given xor K", completed: false, videoLink: "https://youtu.be/eZr-6p0B7ME?si=y9q30YVz8wA4tZ13", articleLink: "https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1" },
  { name: "Merge Overlapping Subintervals", completed: false, videoLink: "https://youtu.be/IexN60k62jo?si=t6Fe7vUEMfp4-ktD", articleLink: "https://www.geeksforgeeks.org/merging-intervals/" },
  { name: "Merge two sorted arrays without extra space", completed: false, videoLink: "https://youtu.be/n7uwj04E0I4?si=Ktesnxcz_aiiO4I5", articleLink: "https://www.geeksforgeeks.org/merge-two-sorted-arrays-o1-extra-space/" },
  { name: "Find the repeating and missing number", completed: false, videoLink: "https://youtu.be/2D0D8HE6uak?si=zJgvBSM8F_J3lkYt", articleLink: "https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/" },
  { name: "Count Inversions", completed: false, videoLink: "https://youtu.be/AseUmwVNaoY?si=NxAqbqo9HJlKzcXm", articleLink: "https://www.geeksforgeeks.org/inversion-count-in-array-using-merge-sort/" },
  { name: "Reverse Pairs", completed: false, videoLink: "https://youtu.be/0e4bZaP3MDI?si=QaQvH4CmyxxiEZyT", articleLink: "https://www.geeksforgeeks.org/find-the-count-of-reverse-pairs/" },
  { name: "Maximum Product Subarray", completed: false, videoLink: "https://youtu.be/hnswaLJvr6g?si=TOb5P_Zi6J-d2XUg", articleLink: "https://www.geeksforgeeks.org/maximum-product-subarray/" },
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
</style>