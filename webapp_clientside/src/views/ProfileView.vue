<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">MY ACCOUNT</p>
      <h2>Your profile</h2>

      <div class="profile-card">
        <div class="row">
          <span class="label">Username :</span>
          <span class="value">user_name</span>
        </div>
        <div class="row">
          <span class="label">Account Type :</span>
          <span class="value">user_type</span>
        </div>
        <div class="row">
          <span class="label">Phone:</span>
          <span class="value">user_phone</span>
        </div>
        <div class="row">
          <span class="label">Birthdate :</span>
          <span class="value">user_birthdate</span>
        </div>
        <div class="row">
          <span class="label">City :</span>
          <span class="value">user_city</span>
        </div>
        <button class="logout-btn">Log Out</button>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'ProfileView',
  components: { Navbar }
}
</script>

<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 600px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin-bottom: 30px; }
.profile-card { background: white; padding: 30px; border-radius: 6px; border: 1px solid #eae5de; display: flex; flex-direction: column; gap: 20px; }
.row { display: flex; justify-content: space-between; border-bottom: 1px solid #f0eee9; padding-bottom: 12px; font-size: 14px; }
.label { color: #666; font-weight: 500; }
.value { color: #292929; font-weight: bold; }
.logout-btn { margin-top: 10px; padding: 10px; background: transparent; color: #d9534f; border: 1px solid #d9534f; border-radius: 4px; font-size: 14px; cursor: pointer; }
.logout-btn:hover { background: #fdf2f2; }
</style>