require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  completedTopics: { type: [String], default: [] },
  badges: { type: [String], default: [] },
  lastLoginDate: { type: Date }, // Track the last login date
  streak: { type: Number, default: 0 }, // Track the streak count
});
const User = mongoose.model('User', userSchema);

// Helper function to award badges
const awardBadge = async (username, badgeName) => {
  const user = await User.findOne({ username });
  if (user && !user.badges.includes(badgeName)) {
    console.log(`Awarding badge: ${badgeName} to user: ${username}`); // Debug log
    user.badges.push(badgeName);
    await user.save();
    console.log(`Badge awarded successfully: ${badgeName}`); // Debug log
  } else {
    console.log(`Badge ${badgeName} already exists for user: ${username}`); // Debug log
  }
};

// Helper functions to check consecutive and same day
function isSameDay(lastLogin, today) {
  if (!lastLogin || !today) {
    return false; // Handle null or undefined values
  }
  return (
    lastLogin.getFullYear() === today.getFullYear() &&
    lastLogin.getMonth() === today.getMonth() &&
    lastLogin.getDate() === today.getDate()
  );
}

function isConsecutiveDay(lastLogin, today) {
  if (!lastLogin || !today) {
    return false; // Handle null or undefined values
  }
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  return today - lastLogin === oneDay;
}

// Routes
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
});

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';  // Ensure you store this securely in environment variables in production

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const today = new Date();
    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null;

    // Check if the last login was yesterday
    if (lastLogin && isConsecutiveDay(lastLogin, today)) {
      user.streak += 1;
    } else if (!isSameDay(lastLogin, today)) {
      // Reset streak if not consecutive or if it's a new day
      user.streak = 1;
    }

    user.lastLoginDate = today;
    await user.save();

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,  // Send the JWT token to the client
      username: user.username,
      completedTopics: user.completedTopics,
      badges: user.badges,
      streak: user.streak,
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

app.post('/update-topics', async (req, res) => {
  const { username, completedTopics } = req.body;

  if (!username || !completedTopics) {
    return res.status(400).json({ message: 'Username and completedTopics are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Merge existing completedTopics with new ones
    const updatedCompletedTopics = [...new Set([...user.completedTopics, ...completedTopics])];
    user.completedTopics = updatedCompletedTopics;
    await user.save();

    // Check if the user has earned any badges
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
    if (basicsTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'PRO in Basic Concepts');
    }

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
    if (arraysTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Array Master');
    }

    const sortingTopics = ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort", "Selection Sort"];
    if (sortingTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Sorting Pro');
    }

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
    if (binarySearchTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Binary Search Expert');
    }

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
    if (stringTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'String Master');
    }

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
    if (linkedListTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Linked List Master');
    }

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
    if (recursionTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Recursion Guru');
    }

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
    if (bitManipulationTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Bit Manipulation Expert');
    }

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
    if (stackTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Stack & Queue Master');
    }
                
    // Core Topics
    const coreTopics = [
      "Computer Network",
      "Operating System",
      "DBMS"
    ];
    if (coreTopics.every(topic => updatedCompletedTopics.includes(topic))) {
      await awardBadge(username, 'Core Master');
    }

    res.status(200).json({ message: 'Topics updated successfully', user });
  } catch (err) {
    console.error('Error updating topics:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.post('/remove-topic', async (req, res) => {
  const { username, topicName } = req.body;

  if (!username || !topicName) {
    return res.status(400).json({ message: 'Username and topicName are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the topic from completedTopics
    user.completedTopics = user.completedTopics.filter(topic => topic !== topicName);
    await user.save();

    // Check if the user still qualifies for badges after removing the topic
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
    if (!basicsTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'PRO in Basic Concepts');
    }

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
    if (!arraysTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Array Master');
    }

    const sortingTopics = ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort", "Selection Sort"];
    if (!sortingTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Sorting Pro');
    }

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
    if (!binarySearchTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Binary Search Expert');
    }

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
    if (!stringTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'String Master');
    }

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
    if (!linkedListTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Linked List Master');
    }

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
    if (!recursionTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Recursion Guru');
    }

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
    if (!bitManipulationTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Bit Manipulation Expert');
    }

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
    if (!stackTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Stack & Queue Master');
    }

    // Core Topics
    const coreTopics = [
      "Computer Network",
      "Operating System",
      "DBMS"
    ];
    if (!coreTopics.every(topic => user.completedTopics.includes(topic))) {
      user.badges = user.badges.filter(badge => badge !== 'Core Master');
    }

    await user.save();
    res.status(200).json({ message: 'Topic removed successfully', user });
  } catch (err) {
    console.error('Error removing topic:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

app.get('/user/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.status(200).json({ completedTopics: user.completedTopics, badges: user.badges });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});