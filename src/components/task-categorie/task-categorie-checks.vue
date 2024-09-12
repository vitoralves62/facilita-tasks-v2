<template>
  <div class="categories-container">
    <div v-for="category in filteredCategories" :key="category.name" class="category-container">
      <input
        type="radio"
        :id="category.name"
        name="task-category"
        :class="`${category.name.toLowerCase()}-check`"
        v-model="localCategory.name"
        :value="category.name"
        @change="onChangeValue(category.name)"
      />
      <label :for="category.name" class="category-text">{{ category.name }}</label>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '@/Stores/taskStore';

export default {
  name: 'TaskCategories',
  props: {
    value: {
      type: Object, // Receber o objeto categoria
      default: () => ({ name: 'Normal' })
    }
  },
  data() {
    return {
      localCategory: { ...this.value },
      store: useTaskStore()
    };
  },
  computed: {
    filteredCategories() {
      // Excluir a categoria 'Normal' da lista de seleção
      return this.store.categorie.filter(cat => cat.name !== 'Normal');
    }
  },
  methods: {
    onChangeValue(newValue){
      this.$emit('input', {name: newValue}); // Define 'Normal' como padrão se não houver seleção
      this.localCategory = { ...newValue };
    }
  },
  
};
</script>

<style lang="stylus">
  @import './task-categorie-checks.styl';
</style>