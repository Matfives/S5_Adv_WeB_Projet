<template>
  <div class="crud-page">
    <Navbar />
    <main class="crud-content">
      <p class="crud-subtitle">MENU ADMINISTRATION</p>
      <div class="crud-toolbar">
        <h1 class="crud-heading">{{ isMissing ? 'Dish not found' : isEdit ? 'Edit dish' : 'Add new dish' }}</h1>
        <router-link :to="{ name: 'Dishes' }" class="crud-button crud-button-secondary">Back to dishes</router-link>
      </div>

      <p v-if="isMissing" class="crud-panel">No dish matches this ID. Return to the menu to select an existing dish.</p>
      <form v-else class="crud-panel" @submit.prevent="submitPrototype">
        <p class="crud-note">Frontend prototype. This form previews dish information; changes are not saved.</p>
        <div class="crud-form-grid">
          <div class="crud-field">
            <label for="dish-name">Dish name</label>
            <input id="dish-name" v-model="form.dish_name" type="text" required />
          </div>
          <div class="crud-field">
            <label for="dish-type">Dish type</label>
            <input id="dish-type" v-model="form.dish_type" type="text" placeholder="e.g. Main course" required />
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
            <textarea id="dish-ingredients" v-model="form.dish_ingredients" rows="4" required></textarea>
          </div>
        </div>
        <div class="crud-actions">
          <button type="submit" class="crud-button">Submit</button>
          <router-link :to="cancelLocation" class="crud-button crud-button-secondary">Cancel</router-link>
        </div>
        <p v-if="submitted" class="crud-status" role="status">Frontend prototype: data will be saved by the backend later. No changes have been saved.</p>
      </form>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

export default {
  name: 'DishFormView',
  components: { Navbar },
  data() {
    return { form: {}, submitted: false }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'DishEdit'
    },
    dish() {
      return restaurantData.dish.find(dish => String(dish.dish_id) === this.$route.params.id)
    },
    isMissing() {
      return this.isEdit && !this.dish
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
        // All dish fields are scalar values. Copy them into a separate form model.
        this.form = this.isEdit && this.dish ? { ...this.dish } : {
          dish_name: '', dish_type: '', dish_price: '', dish_calories: '', dish_ingredients: ''
        }
        this.submitted = false
      }
    }
  },
  methods: {
    submitPrototype() {
      this.submitted = true
    }
  }
}
</script>

<style scoped src="@/assets/crud.css"></style>
