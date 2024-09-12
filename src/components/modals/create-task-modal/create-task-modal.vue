<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal-create-content">
        <div class="modal-header">
          <p class="modal-title">Cadastrar Tarefa</p>
          <CloseButton @close="closeModal" class="close-modal-button"/>
        </div>
        <div class="form-container">
          <form class="create-task-form" @submit.prevent="handleSubmit">
            <TaskTitle
              v-model="task.title"
              class="task-title"
            />
            <TaskDescription
              v-model="task.description"
              class="task-desc"
            />
            <TaskCategories
              v-model="task.category"
              class="task-categorie"
            />
            <button :class="['add-button', { enabled: isFormValid }]" :disabled="!isFormValid">Adicionar</button>
          </form>
        </div>
      </div>
    </div>
</template>
  
<script>
import TaskTitle from '@/components/task-title/task-title.vue';
import TaskDescription from '@/components/task-desc/task-desc.vue';
import CloseButton from '@/components/close-button/close-button.vue';
import TaskCategories from '@/components/task-categorie/task-categorie-checks.vue';
import { useTaskStore } from '@/Stores/taskStore';

export default {
    name: 'CreateTaskModal',
    components: {
      TaskTitle,
      TaskDescription,
      CloseButton,
      TaskCategories
    },
    props: {
        isVisible: {
          type: Boolean,
          required: true
        }
    },
    data() {
        return {
        task: {
            title: '',
            description: '',
            category: { name: 'Normal' }
        }
        };
    },
    computed: {
        isFormValid() {
          return this.task.title.trim() !== '' && this.task.description.trim() !== '';
        }
    },
    methods: {
        closeModal() {
        this.$emit('close');
        },
        handleSubmit() {
        if (this.isFormValid) {
            const taskStore = useTaskStore();
            taskStore.addTask(this.task.title, this.task.description, this.task.category.name);
            this.resetForm();
            this.closeModal();
        }
        },
        resetForm() {
          this.task.title = '';
          this.task.description = '';
          this.task.category = { name: 'Normal' };
        }
    }
    };
</script>

<style lang="stylus">
    @import './create-task-modal.styl'
</style>
  