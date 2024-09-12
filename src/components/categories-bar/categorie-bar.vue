<template>
    <div class="CategoriesBlock">
        <div>
            <p>Categorias</p>
        </div>
        <nav>
            <ul>
                <li>
                    <button @click="selectedCategory('Todas')">
                        <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.68601 4.26557L0.890156 7.88987C0.738709 8.03671 0.493815 8.03671 0.342368 7.88987L0.113586 7.66803C-0.0378619 7.52119 -0.0378619 7.28373 0.113586 7.13689L3.40998 4L0.116808 0.863113C-0.0346396 0.716267 -0.0346396 0.478813 0.116808 0.331967L0.34559 0.110135C0.497038 -0.0367116 0.741931 -0.0367116 0.893379 0.110135L4.68923 3.73443C4.83746 3.88127 4.83746 4.11873 4.68601 4.26557Z" fill="currentColor"/>
                        </svg>
                        Todas
                    </button>
                </li>
                <li v-for="category in categories" :key="category.name">
                    <button @click="selectedCategory(category.name)">
                        <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.68601 4.26557L0.890156 7.88987C0.738709 8.03671 0.493815 8.03671 0.342368 7.88987L0.113586 7.66803C-0.0378619 7.52119 -0.0378619 7.28373 0.113586 7.13689L3.40998 4L0.116808 0.863113C-0.0346396 0.716267 -0.0346396 0.478813 0.116808 0.331967L0.34559 0.110135C0.497038 -0.0367116 0.741931 -0.0367116 0.893379 0.110135L4.68923 3.73443C4.83746 3.88127 4.83746 4.11873 4.68601 4.26557Z" fill="currentColor"/>
                        </svg>
                        {{ category.displayName }}
                        <span v-if="category.name === 'Urgente'" class="urgent">{{ urgentTasks.length }}</span>
                        <span v-if="category.name === 'Importante'" class="important">{{ importantTasks.length }}</span>
                        <span v-if="category.name === 'Normal'" class="normal">{{ normalTasks.length }}</span>
                    </button>
                </li>
                <li>
                    <button @click="selectedCategory('Finalizadas')">
                        <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.68601 4.26557L0.890156 7.88987C0.738709 8.03671 0.493815 8.03671 0.342368 7.88987L0.113586 7.66803C-0.0378619 7.52119 -0.0378619 7.28373 0.113586 7.13689L3.40998 4L0.116808 0.863113C-0.0346396 0.716267 -0.0346396 0.478813 0.116808 0.331967L0.34559 0.110135C0.497038 -0.0367116 0.741931 -0.0367116 0.893379 0.110135L4.68923 3.73443C4.83746 3.88127 4.83746 4.11873 4.68601 4.26557Z" fill="currentColor"/>
                        </svg>
                        Finalizadas
                        <span class="completed">{{ completedTasks.length }}</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { useTaskStore } from '@/Stores/taskStore';
import { computed, onMounted } from 'vue';

export default {
  name: 'CategoriesBar',
  setup(_, { emit }) {
    const taskStore = useTaskStore();

    onMounted(() => {
      taskStore.loadTasks();
    });

    const urgentTasks = computed(() => taskStore.urgentTasks);
    const importantTasks = computed(() => taskStore.importantTasks);
    const normalTasks = computed(() => taskStore.normalTasks);
    const completedTasks = computed(() => taskStore.completedTasks);

    const categories = computed(() => 
      taskStore.categorie.map(category => ({
        ...category,
        displayName: category.name === 'Normal' ? 'Outras' : category.name
      }))
    );

    const selectedCategory = (category) => {
      emit('category-selected', category);
    };

    return {
      urgentTasks,
      importantTasks,
      normalTasks,
      completedTasks,
      categories,
      selectedCategory
    };
  }
};
</script>

<style lang="stylus">
    @import './categories-bar.styl';
</style>
