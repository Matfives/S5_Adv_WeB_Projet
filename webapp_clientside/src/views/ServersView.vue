<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">EVALUATION</p>
      <h2>Past servers</h2>
      
      <div class="servers-list">
        <div class="server-card" v-for="i in 2" :key="i">
          <div class="server-info">
            <h3>user_ID</h3>
          </div>
          <div class="rating-box">
            <label>Leave a review:</label>
            <div class="stars">★★★★★</div>
            <textarea placeholder="Write a comment about the service..."></textarea>
            <button class="submit-review">Submit review</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'ServersView',
  components: { Navbar }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 800px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.servers-list { display: flex; flex-direction: column; gap: 20px; }
.server-card { background: white; padding: 25px; border-radius: 6px; border: 1px solid #eae5de; display: flex; flex-direction: column; gap: 15px; }
.server-info h3 { margin: 0 0 5px 0; font-size: 17px; font-weight: 500; }
.server-info p { font-size: 13px; color: #777; margin: 0; }
.rating-box { display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #f0eee9; padding-top: 15px; }
.rating-box label { font-size: 13px; font-weight: 500; color: #555; }
.stars { font-size: 20px; color: #f0c040; letter-spacing: 4px; cursor: pointer; }
textarea { width: 100%; height: 70px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-family: Arial, sans-serif; font-size: 13px; resize: none; }
.submit-review { align-self: flex-end; padding: 8px 16px; background: #292929; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; }
.submit-review:hover { background: #444; }
</style>