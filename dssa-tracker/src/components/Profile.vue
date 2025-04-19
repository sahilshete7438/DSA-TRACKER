<template>
  <div class="profile-page">
    <h1>Profile Page</h1>
    <p>Welcome to your profile, {{ $root.loggedInUser }}!</p>

    <!-- Badges Section -->
    <div class="badges-section">
      <h2>Badges</h2>
      <div v-if="badges.length > 0" class="badges-grid">
        <div v-for="badge in badges" :key="badge" class="badge-card" @click="toggleBadge(badge)">
          <div class="badge-content">
            <span class="badge-icon">🏅</span>
            <span class="badge-name">{{ badge }}</span>
          </div>
          <div v-if="expandedBadge === badge" class="badge-details">
            <p>Congratulations! You earned this badge by mastering a topic.</p>
          </div>
        </div>
      </div>
      <p v-else>No badges earned yet. Keep solving problems to earn badges!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      badges: [], // Store user badges
      expandedBadge: null, // Track the expanded badge
    };
  },
  methods: {
    async fetchBadges() {
      if (this.$root.loggedInUser) {
        try {
          const response = await axios.get(`http://localhost:5000/user/${this.$root.loggedInUser}`);
          this.badges = response.data.badges;
        } catch (err) {
          console.error('Error fetching badges:', err);
        }
      }
    },
    toggleBadge(badge) {
      this.expandedBadge = this.expandedBadge === badge ? null : badge;
    },
  },
  mounted() {
    this.fetchBadges();
  },
};
</script>

<style scoped>
.profile-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.badges-section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.badge-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.badge-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.badge-content {
  padding: 15px;
  text-align: center;
}

.badge-icon {
  font-size: 2em;
  display: block;
  margin-bottom: 10px;
}

.badge-name {
  font-weight: bold;
  color: #4CAF50;
}

.badge-details {
  padding: 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
  font-size: 0.9em;
  color: #555;
}
</style>