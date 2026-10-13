<template>
  <header class="navbar">
    <div class="brand">Matking</div>
    <nav class="nav-links">
        <router-link to="/">Home</router-link>
      <router-link to="/restaurants">Restaurants</router-link>
      <router-link to="/dishes">Our dishes</router-link>
      <router-link to="/servers">Past servers</router-link>
      <router-link to="/profile">Your profile</router-link>
      <router-link to="/login" class="login-link">Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  height: 70px;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #eae5de;
  font-family: Arial, sans-serif;
}

.brand {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #292929;
}

.nav-links {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  color: #292929;
  font-weight: bold;
}

.login-link {
  padding: 8px 16px;
  background: #292929;
  color: white !important;
  border-radius: 4px;
}
</style>