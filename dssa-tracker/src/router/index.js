// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import BasicsPage from '../components/BasicsPage.vue'; // Page for Basics
import SortingPage from '../components/SortingPage.vue'; // Page for Sorting Techniques
import ArraysPage from '../components/ArraysPage.vue'; // Page for Arrays
import BinarySearchPage from '../components/BinarySearchPage.vue'; // Page for Binary Search
import StringsPage from '../components/StringsPage.vue'; // Page for Strings
import LinkedListPage from '../components/LinkedListPage.vue'; // Page for Linked List
import RecursionPage from '../components/RecursionPage.vue'; //Page for Recursion 
import BitManipulation from '../components/BitManipulation.vue'; //Page for Bit
import StackPage from '../components/StackPage.vue'; //page for Stack
import somepage from '../components/somepage.vue';  //page for somepage
import CorePage from '../components/CorePage.vue';  //page for Corepage
import Profile from '../components/Profile.vue';  //page for Profile


const routes = [
  { path: '/', component: HomePage },
  { path: '/basics', component: BasicsPage },
  { path: '/sorting', component: SortingPage },
  { path: '/arrays', component: ArraysPage },
  { path: '/binary-search', component: BinarySearchPage },
  { path: '/strings', component: StringsPage },
  { path: '/linked-list', component: LinkedListPage },
  {path: '/recursion', component:RecursionPage},
  {path: '/bitmanipulation', component:BitManipulation} ,
  {path: '/stack', component:StackPage},
  {path: '/somepage',component:somepage},
  {path: '/core',component: CorePage},
  {path: '/profile',component: Profile},

  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;