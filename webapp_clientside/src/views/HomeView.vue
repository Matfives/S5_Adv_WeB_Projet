<template>
  <div class="home">
    <Navbar />

    <section class="hero">
      <img
        src="@/assets/restaurant.jpg"
        alt="Matking Restaurant"
        class="hero-image"
      />
      <div class="hero-overlay">
        <p class="small-title">WELCOME</p>
        <h1>Matking restaurant</h1>
        <p class="description">
          Delicious food in a warm and welcoming atmosphere.
        </p>
        <p v-if="auth.role === 'visitor'" class="visitor-note">
          Browse the menu and restaurants as a visitor, or try a demo login.
        </p>
        <div class="buttons">
          <router-link v-if="auth.role === 'visitor'" to="/login" class="primary-btn">
            Login
          </router-link>
          <router-link to="/dishes" class="primary-btn">
            Discover the Menu
          </router-link>
          <router-link to="/restaurants" class="secondary-btn">
            Our Locations
          </router-link>
        </div>
      </div>
    </section>

    <section class="about">
      <p class="section-title">OUR RESTAURANT</p>
      <h2>Food made with passion</h2>
      <p>
        We welcome you to a friendly and comfortable place where you can
        discover delicious food prepared with high-quality ingredients.
      </p>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { authState } from '@/services/auth'

export default {
  name: 'HomeView',
  components: { Navbar },
  data() {
    return { auth: authState }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }
.home { min-height: 100vh; background: #f8f5f0; color: #292929; font-family: Arial, sans-serif; }
.hero { position: relative; height: 600px; overflow: hidden; }
.hero-image { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 20px; background: rgba(0, 0, 0, 0.42); color: white; }
.small-title { font-size: 13px; letter-spacing: 4px; margin-bottom: 10px; }
h1 { margin: 0; font-size: 55px; font-weight: 500; }
.description { margin-top: 20px; font-size: 19px; }
.visitor-note { font-size: 14px; margin: 10px 0 0; }
.buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 30px; }
.primary-btn, .secondary-btn { padding: 13px 25px; border-radius: 4px; font-size: 15px; cursor: pointer; text-decoration: none; display: inline-block; }
.primary-btn { border: none; background: white; color: #292929; }
.secondary-btn { border: 1px solid white; background: transparent; color: white; }
.primary-btn:hover { background: #eee; }
.secondary-btn:hover { background: rgba(255, 255, 255, 0.15); }
.about { max-width: 700px; margin: auto; padding: 80px 30px; text-align: center; }
.section-title { font-size: 12px; letter-spacing: 3px; color: #777; }
.about h2 { font-size: 32px; font-weight: 500; margin: 15px 0; }
.about p:last-child { color: #666; line-height: 1.7; }
</style>