<template>
  <div class="homepage">
    <header>
      <h1>DSA TRACKER</h1>
      <p>"You take your life in your own hands, and what happens? A terrible thing, no one to blame." - Erica Jong</p>

      <div class="start-solving">
        <h2>Start Solving 🔥</h2>
      </div>
    </header>

    <section class="content">
      <div class="grid-container">
        <div class="section">
          <h3>Basics</h3>
          <div class="progress-bar">
            <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <p>{{ completedCount }}/{{ totalTopics }} Done</p>
          <button @click="$router.push('/basics')">Go to Basics</button>
        </div>

        <div class="section">
          <h3>Sorting Techniques</h3>
          <div class="progress-bar">
            <div class="progress" :style="{ width: sortingProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedSorting }}/{{ totalSorting }} Done</p>
          <button @click="$router.push('/sorting')">Start Now</button>
        </div>

        <div class="section">
          <h3>Arrays</h3>
                <p>Easy → Medium → Hard</p>
          <div class="progress-bar">
            <div class="progress" :style="{ width: arraysProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedArrays }}/{{ totalArrays }} Done</p>
          
          <button @click="$router.push('/arrays')">Start Now</button>
        </div>

        <div class="section">
          <h3>Binary Search</h3>
          <p>1D, 2D Arrays, Space Search</p>
          <div class="progress-bar">
            <div class="progress" :style="{ width: binaryProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedbinary }}/{{ totalbinary }} Done</p>
          <button @click="$router.push('/binary-search')">Start Now</button>
        </div>

        <div class="section">
          <h3>Strings</h3>
          <p>Medium & Hard</p>
          <div class="progress-bar">
            <div class="progress" :style="{ width: StringsProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedStrings }}/{{ totalStrings }} Done</p>
          <button @click="$router.push('/strings')">Start Now</button>
        </div>

        <div class="section">
          <h3>Linked List</h3>
          <p>Single/Double LL, Medium, Hard</p>
           <div class="progress-bar">
            <div class="progress" :style="{ width: LinkedProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedLinked }}/{{ totalLinked }} Done</p>
          <button @click="$router.push('/linked-list')">Start Now</button>
        </div>

        <div class="section">
          <h3>Recursion</h3>
          <p>Pattern Wise</p>
            <div class="progress-bar">
            <div class="progress" :style="{ width: RecursionProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedRecursion }}/{{ totalRecursion }} Done</p>
          <button @click="$router.push('/recursion')">Start Now</button>
        </div>

        <div class="section">
          <h3>Bit Manipulation</h3>
          <p>Concepts & Problems</p>
           <div class="progress-bar">
            <div class="progress" :style="{ width: BitProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedBit }}/{{ totalBit }} Done</p>
          <button @click="$router.push('/bitmanipulation')">Start Now</button>
        </div>

        <div class="section">
          <h3>Stack & Queue</h3>
          <p>Pre-In-Post Fix, Monotonic Stack</p>
          <div class="progress-bar">
            <div class="progress" :style="{ width: StackProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedStack }}/{{ totalStack }} Done</p>
          <button @click="$router.push('/stack')">Start Now</button>
        </div>

         <div class="section">
          <h3>Core Subjects</h3>
          <p>CN, OS, DBMS</p>
          <div class="progress-bar">
            <div class="progress" :style="{ width: CoreProgressPercentage + '%' }"></div>
          </div>
          <p>{{ completedCore }}/{{ totalCore }} Done</p>
          <button @click="$router.push('/Core')">Start Now</button>
        </div>

        
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
      <p>CONNECT WITH US</p>
      <div class="social-links">
        <a href="https://github.com/sahilshete7438" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github"></i> GitHub
        </a>
        <a href="https://www.instagram.com/sahil_shete7438?igsh=NWY1cHZocGV2d3Qx" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-instagram"></i> Instagram
        </a>
        <a href="https://www.linkedin.com/in/shetesahil/" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
      <p>@2025 : Made by Sahil Shete</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      completedCount: 0,
      totalTopics: 9, // Total number of topics in Basics segment
      completedArrays: 0, // New property for Arrays
      totalArrays: 41, // New property for Arrays
      completedSorting: 0, // New property for Sorting Techniques
      totalSorting: 5, // New property for Sorting Techniques
      completedbinary: 0,
      totalbinary:14,
      completedStrings: 0,
      totalStrings: 14,
      totalLinked: 9,
      completedLinked: 0,
      completedRecursion: 0,
      totalRecursion: 17,
      completedBit: 0,
      totalBit: 8,
      completedStack: 0,
      totalStack: 14,
      completedCore: 0,
      totalCore: 3,
    };
  },
  computed: {
  progressPercentage() {
    return (this.completedCount / this.totalTopics) * 100;
  },
  arraysProgressPercentage() {
    return (this.completedArrays / this.totalArrays) * 100;
  },
  binaryProgressPercentage() {
    return (this.completedbinary / this.totalbinary) * 100;
  },
  sortingProgressPercentage() {
    return (this.completedSorting / this.totalSorting) * 100;
  },
  StringsProgressPercentage() {
    return (this.completedStrings / this.totalStrings) * 100;
  },
  LinkedProgressPercentage() {
    return (this.completedLinked / this.totalLinked) * 100;
  },
   RecursionProgressPercentage() {
    return (this.completedRecursion / this.totalRecursion) * 100;
  },

  BitProgressPercentage() {
    return (this.completedBit / this.totalBit) * 100;
  },

  StackProgressPercentage() {
    return (this.completedStack / this.totalStack) * 100;
  },

  CoreProgressPercentage() {
    return (this.completedCore / this.totalCore) * 100;
  },

  
  // Add more computed properties as needed
},
 methods: {
  async fetchCompletedTopics() {
    if (this.$root.loggedInUser) {
      try {
        const response = await axios.get(`http://localhost:5000/user/${this.$root.loggedInUser}`);
        const completedTopics = response.data.completedTopics;

        // Basics
       const basicsTopics = [
    "User Input/Output",
    "Data Types",
    "If Else Statements",
    "Switch Statement",
    "What are arrays, strings?",
    "For loops",
    "while loops",
    "Functions(pass by reference)",
    "Time Complexity"
];
        this.completedCount = basicsTopics.filter(topic => completedTopics.includes(topic)).length;

        // Arrays
        const arraysTopics = [
  "Largest Element in an Array",
  "Second Largest Element in an Array without sorting",
  "Check if the array is sorted",
  "Remove duplicates from Sorted array",
  "Left Rotate an array by one place",
  "Left rotate an array by D places",
  "Move Zeros to end",
  "Linear Search",
  "Find the Union and intersection of two sorted arrays",
  "Find missing number in an array",
  "Maximum Consecutive Ones",
  "Subarray with given sum",
  "Find the Missing Number",
  "Find the number that appears once, and other numbers twice",
  "Search an element in a 2D matrix",
  "Find the row with maximum number of 1’s",
  "2Sum Problem",
  "Sort an array of 0’s 1’s and 2’s",
  "Majority Element (>n/2 times)",
  "Kadane’s Algorithm, maximum subarray sum",
  "Print subarray with maximum subarray sum (extended version of above problem)",
  "Stock Buy and Sell",
  "Rearrange the array in alternating positive and negative items",
  "Next Permutation",
  "Leaders in an Array problem",
  "Longest Consecutive Sequence in an Array",
  "Set Matrix Zeros",
  "Rotate Matrix by 90 degrees",
  "Print the matrix in spiral manner",
  "Pascal’s Triangle",
  "Majority Element (n/3 times)",
  "3-Sum Problem",
  "4-Sum Problem",
  "Largest Subarray with 0 Sum",
  "Count number of subarrays with given xor K",
  "Merge Overlapping Subintervals",
  "Merge two sorted arrays without extra space",
  "Find the repeating and missing number",
  "Count Inversions",
  "Reverse Pairs",
  "Maximum Product Subarray"
];

        this.completedArrays = arraysTopics.filter(topic => completedTopics.includes(topic)).length;

        // Sorting Techniques
        const sortingTopics = ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort", "Selection Sort"];
        this.completedSorting = sortingTopics.filter(topic => completedTopics.includes(topic)).length;

        const binarySearchTopics = [
  "Binary Search to find X in sorted array",
  "Implement Lower Bound",
  "Implement Upper Bound",
  "Search Insert Position",
  "Check if Input array is sorted",
  "Find the first or last occurrence of a given number in a sorted array",
  "Count occurrences of a number in a sorted array with duplicates",
  "Find peak element",
  "Search in Rotated Sorted Array I",
  "Search in Rotated Sorted Array II",
  "Find minimum in Rotated Sorted Array",
  "Single element in a Sorted Array",
  "Find kth element of two sorted arrays",
  "Find out how many times an array has been rotated",
];
  this.completedbinary = binarySearchTopics.filter(topic => completedTopics.includes(topic)).length;

  const stringTopics = [
  "Remove outermost Parenthesis",
  "Reverse words in a given string / Palindrome Check",
  "Largest odd number in a string",
  "Longest Common Prefix",
  "Isomorphic String",
  "Check whether one string is a rotation of another",
  "Sort Characters by Frequency",
  "Maximum Nesting Depth of Parenthesis",
  "Roman Number to Integer and vice versa",
  "Implement Atoi",
  "Count Number of Substrings",
  "Longest Palindromic Substring (Do it without DP)",
  "Sum of Beauty of all Substrings",
  "Reverse Every Word in a String"
];

   this.completedStrings = stringTopics.filter(topic => completedTopics.includes(topic)).length;

   const linkedListTopics = [
     "Introduction to LinkedList learn about struct and how a node is represented",
     "Inserting a node in LinkedList",
     "Deleting a node in LinkedList",
    "Find the length of the LinkedList",
      "Search an element in the LinkedList",
     "Introduction to DLL learn about struct and how a node is represented",
     "Insert a node in DLL",
      "Delete a node in DLL",
     "Reverse a DLL"
];
     this.completedLinked = linkedListTopics.filter(topic => completedTopics.includes(topic)).length;

     const recursionTopics = [
  "Recursive Implementation of atoi()",
  "Pow(x, n)",
  "Count Good Numbers",
  "Sort a stack using recursion",
  "Reverse a stack using recursion",
  "Generate all binary strings",
  "Generate Parenthesis",
  "Print all subsequences / Power Set",
  "Learn All Patterns of Subsequences (Theory)",
  "Count all subsequences with sum K",
  "Check if there exists a subsequence with sum K",
  "Combination Sum",
  "Combination Sum-II",
  "Combination Sum – III",
  "Subset Sum-I",
  "Subset Sum-II",
  "Letter Combinations of a Phone Number"
];

   this.completedRecursion = recursionTopics.filter(topic => completedTopics.includes(topic)).length;

   const bitManipulationTopics = [
  "Introduction to Bit Manipulation [Theory]",
  "Check if the i-th bit is set or not",
  "Check if a number is odd or not",
  "Check if a number is power of 2 or not",
  "Count the number of set bits",
  "Set/Unset the rightmost unset bit",
  "Swap two numbers",
  "Divide two integers without using multiplication, division, and mod operator"
];

  
   this.completedBit = bitManipulationTopics.filter(topic => completedTopics.includes(topic)).length;

   const stackTopics = [
  "Implement Stack using Arrays",
  "Implement Queue using Arrays",
  "Implement Stack using Queue",
  "Implement Queue using Stack",
  "Implement Stack using LinkedList",
  "Implement Queue using LinkedList",
  "Check for balanced Parenthesis",
  "Implement Min Stack",
  "Infix to Postfix Conversion using Stack",
  "Prefix to Infix Conversion",
  "Prefix to Postfix Conversion",
  "Postfix to Prefix Conversion",
  "Postfix to Infix Conversion",
  "Convert Infix to Prefix Notation"
];

  this.completedStack = stackTopics.filter(topic => completedTopics.includes(topic)).length;

const CoreTopics = [
  "Computer Network",
  "Operating System",
  "DBMS",
];

this.completedCore = CoreTopics.filter(topic => completedTopics.includes(topic)).length;


        // Add more sections as needed
      } catch (err) {
        console.error('Error fetching completed topics:', err);
      }
    }
  },
},
  mounted() {
    this.fetchCompletedTopics();
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.homepage {
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 2.5em;
  color: #333;
}

.start-solving {
  margin-top: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section h3 {
  font-size: 1.4em;
  color: #333;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.footer {
  text-align: center;
  padding: 30px;
  background-color: white;
  color: #333;
  font-size: 0.9em;
  margin-top: auto;
}

.social-links {
  margin: 10px 0;
}

.social-links a {
  color: #333;
  text-decoration: none;
  margin: 0 10px;
  font-size: 1em;
}

.social-links a:hover {
  color: #4CAF50;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}


</style>