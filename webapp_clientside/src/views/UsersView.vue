<template>
  <div class="page">
    <Navbar />
    <main class="content">
      <p class="subtitle">USER DIRECTORY</p>
      <div class="crud-toolbar">
        <h2>Users</h2>
        <router-link :to="{ name: 'UserNew' }" class="crud-button">Add new user</router-link>
      </div>

      <div class="filters">
        <div class="filter-field search-field">
          <label for="user-search">Search users</label>
          <input
            id="user-search"
            v-model="searchQuery"
            type="search"
            placeholder="Search by name or city"
          />
        </div>
        <div class="filter-field">
          <label for="user-type">User type</label>
          <select id="user-type" v-model="selectedType">
            <option value="">All types</option>
            <option v-for="type in userTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <p class="user-count" role="status">
        {{ filteredUsers.length }} matching user{{ filteredUsers.length === 1 ? '' : 's' }}
        of {{ users.length }}
      </p>

      <div class="table-wrapper" role="region" aria-label="Users table" tabindex="0">
        <table class="users-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Phone</th>
              <th scope="col">Birthdate</th>
              <th scope="col">City</th>
              <th scope="col">Restaurant ID</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.user_id">
              <td>{{ user.user_id }}</td>
              <td>{{ user.user_name }}</td>
              <td>{{ user.user_type }}</td>
              <td>{{ user.user_phone }}</td>
              <td>{{ user.user_birthdate }}</td>
              <td>{{ user.user_city }}</td>
              <td>{{ user.rest_id }}</td>
              <td>
                <div class="crud-actions">
                  <router-link :to="{ name: 'UserDetail', params: { id: user.user_id } }" class="crud-button crud-button-secondary">Show</router-link>
                  <router-link :to="{ name: 'UserEdit', params: { id: user.user_id } }" class="crud-button crud-button-secondary">Edit</router-link>
                  <button type="button" class="crud-button crud-button-secondary" disabled title="Deletion is unavailable in this frontend prototype">Delete</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredUsers.length === 0">
              <td colspan="8" class="empty-state">No users match your search and type filter.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

export default {
  name: 'UsersView',
  components: { Navbar },
  data() {
    return {
      users: restaurantData.Users,
      searchQuery: '',
      selectedType: ''
    }
  },
  computed: {
    userTypes() {
      return [...new Set(this.users.map(user => user.user_type))].sort()
    },
    filteredUsers() {
      const search = this.searchQuery.trim().toLowerCase()

      return this.users.filter(user => {
        const matchesSearch = user.user_name.toLowerCase().includes(search) ||
          user.user_city.toLowerCase().includes(search)
        const matchesType = this.selectedType === '' || user.user_type === this.selectedType

        return matchesSearch && matchesType
      })
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
<style scoped>
.page { min-height: 100vh; background: #f8f5f0; font-family: Arial, sans-serif; color: #292929; }
.content { max-width: 1100px; margin: auto; padding: 50px 20px; }
.subtitle { font-size: 11px; letter-spacing: 3px; color: #777; margin-bottom: 5px; }
h2 { font-size: 28px; font-weight: 500; margin: 0; }
.filters { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 15px; }
.filter-field { display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 180px; }
.search-field { flex: 2; }
.filter-field label { font-size: 13px; color: #555; }
.filter-field input, .filter-field select { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ddd; border-radius: 4px; background: white; color: #292929; font-family: inherit; font-size: 14px; }
.filter-field input:focus, .filter-field select:focus { outline: 2px solid #292929; outline-offset: 2px; }
.user-count { font-size: 13px; color: #777; margin-bottom: 15px; }
.table-wrapper { width: 100%; overflow-x: auto; border: 1px solid #eae5de; border-radius: 6px; background: white; }
.users-table { width: 100%; min-width: 1050px; border-collapse: collapse; font-size: 14px; }
.users-table th, .users-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; white-space: nowrap; }
.users-table th { background: #f4f0eb; font-weight: 500; color: #444; }
.users-table tbody tr:last-child td { border-bottom: none; }
.users-table tbody tr:hover { background: #faf8f5; }
.users-table .empty-state { text-align: center; color: #777; padding: 25px 15px; }
.users-table .crud-actions { flex-wrap: nowrap; }

@media (max-width: 600px) {
  .filters { flex-direction: column; }
  .filter-field { min-width: 0; }
}
</style>
