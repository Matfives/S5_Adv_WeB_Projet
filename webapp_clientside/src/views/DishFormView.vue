<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">MENU ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ isMissing ? 'Dish not found' : isEdit ? 'Edit dish' : 'Add new dish' }}</h1>
        <router-link :to="{ name: 'Dishes' }" class="crud-button crud-button-secondary">Back to dishes</router-link>
      </div>

      <p v-if="loading" class="crud-panel" role="status">Loading...</p>
      <p v-else-if="isMissing" class="crud-panel">No dish matches this ID. Return to the menu to select an existing dish.</p>
      <form v-else class="crud-panel" @submit.prevent="submit">
        <div class="crud-form-grid">
          <div class="crud-field crud-field-wide">
            <label for="dish-name">Name</label>
            <input id="dish-name" v-model="form.dish_name" type="text" required />
          </div>
          <div class="crud-field">
            <label for="dish-type">Type</label>
            <select id="dish-type" v-model="form.dish_type" required>
              <option value="" disabled>Select a type</option>
              <option v-for="type in dishTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>
          <div class="crud-field">
            <label for="dish-price">Price (EUR)</label>
            <input id="dish-price" v-model="form.dish_price" type="number" min="0" step="0.01" required />
          </div>
          <div class="crud-field">
            <label for="dish-calories">Calories (kcal)</label>
            <input id="dish-calories" v-model="form.dish_calories" type="number" min="0" step="1" required />
          </div>
          <div class="crud-field crud-field-wide">
            <label for="dish-ingredients">Ingredients</label>
            <textarea id="dish-ingredients" v-model="form.dish_ingredients" rows="3" required></textarea>
          </div>
        </div>
        <div class="crud-actions">
          <button type="submit" class="crud-button" :disabled="saving">{{ saving ? 'Saving...' : 'Submit' }}</button>
          <router-link :to="cancelLocation" class="crud-button crud-button-secondary">Cancel</router-link>
        </div>
        <p v-if="error" class="crud-status" role="alert">{{ error }}</p>
      </form>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { apiGet, apiSend } from '@/services/api'

export default {
  name: 'DishFormView',
  components: { Navbar },
  data() {
    return {
      form: {},
      dishes: [],
      loading: true,
      saving: false,
      error: ''
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'DishEdit'
    },
    dish() {
      return this.dishes.find(dish => String(dish.dish_id) === this.$route.params.id)
    },
    dishTypes() {
      return [...new Set(this.dishes.map(dish => dish.dish_type))].filter(Boolean).sort()
    },
    isMissing() {
      return this.isEdit && !this.loading && !this.dish
    },
    cancelLocation() {
      return this.isEdit && this.dish
        ? { name: 'DishDetail', params: { id: this.dish.dish_id } }
        : { name: 'Dishes' }
    }
  },
  watch: {
    '$route.fullPath': {
      immediate: true,
      handler() {
        this.load()
      }
    }
  },
  methods: {
    async load() {
      this.loading = true
      this.error = ''
      try {
        this.dishes = (await apiGet('/dishes')) || []
      } catch {
        this.error = 'Unable to load data. Check that the backend is running.'
      }
      // Copy scalar values so editing never changes the loaded record.
      this.form = this.isEdit && this.dish ? { ...this.dish } : {
        dish_name: '', dish_type: '', dish_price: '', dish_calories: '', dish_ingredients: ''
      }
      this.loading = false
    },
    async submit() {
      this.saving = true
      this.error = ''
      try {
        if (this.isEdit) {
          await apiSend('PUT', `/dishes/${this.dish.dish_id}`, this.form)
        } else {
          await apiSend('POST', '/dishes', this.form)
        }
        this.$router.push({ name: 'Dishes' })
      } catch (e) {
        this.error = e.message
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>