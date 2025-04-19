<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <div class="progress-wrapper">
      <p>{{ completed }}/{{ total }} Completed</p>
      <div class="progress-circle" :style="{ '--progress': progressPercentage + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'completed', 'total'],
  computed: {
    progressPercentage() {
      return (this.completed / this.total) * 100;
    },
  },
};
</script>

<style scoped>
.card {
  padding: 20px;
  background: #e0f7fa;
  border-radius: 10px;
  width: 250px;
  text-align: center;
}
.progress-wrapper {
  position: relative;
  margin-top: 10px;
}
.progress-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#4caf50 var(--progress), #ddd 0);
  margin: auto;
}
</style>
