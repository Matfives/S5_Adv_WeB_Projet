<template>
  <div class="home">

    <!-- Navigation -->
    <header class="navbar">
      <div class="restaurant-name">
        Matking Restaurant
      </div>

      <nav>
        <a href="#">Home</a>
        <a href="#">Menu</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <button class="reservation-btn">
        Book a Table
      </button>
    </header>

    <!-- Main image -->
    <section class="hero">
      <img
        src="@/assets/restaurant.jpg"
        alt="Matking Restaurant"
        class="hero-image"
      />

      <div class="hero-overlay">
        <p class="small-title">WELCOME</p>

        <h1>Matking Restaurant</h1>

        <p class="description">
          Delicious food in a warm and welcoming atmosphere.
        </p>

        <div class="buttons">
          <button class="primary-btn">
            Discover the Menu
          </button>

          <button class="secondary-btn">
            Book a Table
          </button>
        </div>
      </div>
    </section>

    <!-- About section -->
    <section class="about">
      <p class="section-title">OUR RESTAURANT</p>

      <h2>Food Made with Passion</h2>

      <p>
        We welcome you to a friendly and comfortable place where you can
        discover delicious food prepared with high-quality ingredients.
      </p>
    </section>

  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.home {
  min-height: 100vh;
  background: #f8f5f0;
  color: #292929;
  font-family: Arial, sans-serif;
}

/* NAVBAR */

.navbar {
  height: 75px;
  padding: 0 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-bottom: 1px solid #eee;
}

.restaurant-name {
  font-size: 20px;
  font-weight: 500;
}

nav {
  display: flex;
  gap: 30px;
}

nav a {
  text-decoration: none;
  color: #333;
  font-size: 15px;
}

nav a:hover {
  color: #777;
}

.reservation-btn {
  padding: 11px 20px;
  border: none;
  background: #292929;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

/* HERO */

.hero {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  background: rgba(0, 0, 0, 0.42);
  color: white;
}

.small-title {
  font-size: 13px;
  letter-spacing: 4px;
  margin-bottom: 10px;
}

h1 {
  margin: 0;
  font-size: 55px;
  font-weight: 500;
}

.description {
  margin-top: 20px;
  font-size: 19px;
}

/* BUTTONS */

.buttons {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.primary-btn,
.secondary-btn {
  padding: 13px 25px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
}

.primary-btn {
  border: none;
  background: white;
  color: #292929;
}

.secondary-btn {
  border: 1px solid white;
  background: transparent;
  color: white;
}

.primary-btn:hover {
  background: #eee;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* ABOUT */

.about {
  max-width: 700px;
  margin: auto;
  padding: 80px 30px;
  text-align: center;
}

.section-title {
  font-size: 12px;
  letter-spacing: 3px;
  color: #777;
}

.about h2 {
  font-size: 32px;
  font-weight: 500;
  margin: 15px 0;
}

.about p:last-child {
  color: #666;
  line-height: 1.7;
}
</style>