<template>
    <div class="modal-overlay" v-if="isVisible">
        <div class="modal-content">
            <div class="trash-container">
                <img src="@/assets/imgs/trash.svg" class="trash-icon"/>
            </div>
            <div class="delete-text-container">
                <p class="delete-text-title">Tem certeza que deseja <span class="delete-span">excluir</span> esta tarefa?</p>
                <p class="delete-text-subtitle">Esta ação não poderá ser desfeita.</p>
            </div>
            <div class="buttons-container">
                <button @click="closeModal" class="cancel-button">Cancelar</button>
                <button @click="confirmDeletion" class="confirm-delete-button">Confirmar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useTaskStore } from '@/Stores/taskStore';
import { ref } from 'vue';

export default {
    name: 'DeleteTaskModal',
    props: {
        taskId: {
            type: Number,
            required: true
        },
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    setup(props, { emit }) {
        const taskStore = useTaskStore();
        const deletedTask = ref(props.taskId);

        const confirmDeletion = () => {
            console.log("Testei",deletedTask)

            taskStore.deleteTask(deletedTask.value);
            
            console.log(deletedTask)
            closeModal();
        };

        const closeModal = () => {
            emit('close');
        };

        return {
            closeModal,
            confirmDeletion
        };
    }
}
</script>

<style lang="stylus">
@import './delete-task-modal.styl'
</style>
