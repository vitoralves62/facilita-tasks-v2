<template>
    <div class="modal-overlay" v-if="isVisible">
        <div class="modal-edit-content">
            <div class="modal-header">
                <p class="modal-title">Editar Tarefa</p>
                <CloseButton @close="closeModal" class="close-modal-button"/>
            </div>
            <div class="form-container">
                <form class="edit-task-form" @submit.prevent="handleSubmit">
                    <TaskTitle v-model="editedTask.title" class="task-title"/>
                    <TaskDescription v-model="editedTask.description" class="task-desc"/>
                    <TaskCategories v-model="editedTask.category" class="task-categorie"/>
                    <button :class="['add-button', { enabled: isFormValid }]" :disabled="!isFormValid">Salvar</button>
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
import { ref, watch, computed, toRaw } from 'vue';

export default {
    name: 'EditTaskModal',
    components: {
        TaskTitle,
        TaskDescription,
        CloseButton,
        TaskCategories
    },
    props: {
        task: {
            type: Object,
            required: true
        },
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    setup(props, { emit }) {
        const taskStore = useTaskStore();
        const editedTask = ref({ ...props.task });

        watch(props.task, (newTask) => {
            editedTask.value = { 
                id: newTask.id, 
                title: newTask.title, 
                description: newTask.description, 
                category: newTask.category
            };
        });


        const isFormValid = computed(() => {
            return editedTask.value.title.trim() !== '' && editedTask.value.description.trim() !== '';
        });

        const closeModal = () => {
            emit('close');
        };

        const handleSubmit = () => {
            if (isFormValid.value) {
                // Usar toRaw para desembrulhar o objeto reativo
                const taskToSave = toRaw(editedTask.value);

                taskStore.updateTask(
                    taskToSave.id,
                    taskToSave.title,
                    taskToSave.description,
                    taskToSave.category.name
                );
                closeModal();
            }
        };

        // onMounted(() => {
        //     document.body.classList.add('modal-open');
        // });
        // onBeforeUnmount(() => {
        //     document.body.classList.remove('modal-open');
        // });

        return {
            editedTask,
            isFormValid,
            closeModal,
            handleSubmit
        };
    }
}
</script>

<style lang="stylus">
    @import './edit-task-modal.styl'

    .modal-overlay {
        z-index: 1000; /* Certifique-se de que este valor é maior do que o z-index de outros elementos na página */
    }
</style>
