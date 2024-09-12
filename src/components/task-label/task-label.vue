<template>
    <div @mouseleave="onMouseLeave">
        <EditTaskModal
            v-if="isEditModalVisible"
            :task="taskToEdit"
            :isVisible="isEditModalVisible"
            @close="isEditModalVisible = false"
        />
        <DeleteTaskModal
            v-if="isDeleteModalVisible"
            :taskId="taskToDelete"
            :isVisible="isDeleteModalVisible"
            @close="isDeleteModalVisible = false"
        />
        <label :class="['label-container', { 'checked': isChecked }]">
            <CustomCheckbox class="checkbox" v-model="isChecked" @change="handleCheckboxChange"/>
            <div class="task-text-container">
                <label class="task-label-title">
                    {{ task.title }}
                </label>
            </div>
            <div class="task-options-and-categorie">
                <label :class="['task-label-categorie', categoryClass]">
                    {{ task.category.name !== 'Normal' ? task.category.name : '' }}
                </label>
                <button class="task-options" @click="toggleMenu">
                    <img src="@/assets/imgs/task-options.svg" />
                </button>
                <KebabMenu 
                    class="kebab-menu-in-label"
                    v-if="menuVisible"
                    :taskId="task.id"
                    :showKebabMenu="menuVisible"
                    @open-task-edit="openEditModal"
                    @open-task-delete="openDeleteModal"
                />
            </div>
        </label>
    </div>
</template>

<script>
import CustomCheckbox from '@/components/inputs/check-box/check-box.vue';
import KebabMenu from '../kebab-menu/kebab-menu.vue';
import EditTaskModal from '../modals/edit-task-modal/edit-task-modal.vue';

import { ref, computed, watch } from 'vue';
import { useTaskStore } from '@/Stores/taskStore';
import DeleteTaskModal from '../modals/delete-task-modal/delete-task-modal.vue';

export default {
    name: 'TaskLabel',
    components: {
        CustomCheckbox,
        KebabMenu,
        EditTaskModal,
        DeleteTaskModal
    },
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    setup(props){
        const taskStore = useTaskStore();

        const isChecked = ref(props.task.status);

        const menuVisible = ref(null);

        const taskToEdit = ref(null);
        const isEditModalVisible = ref(false);
        const taskLabelRef = ref(null);
        const taskToDelete = ref(null);
        const isDeleteModalVisible = ref(false);
        
        const handleCheckboxChange = () => {
            toggleCompletion();
        };

        const toggleCompletion = () => {
            taskStore.toggleTaskStatus(props.task.id);
            isChecked.value = !isChecked.value;
        };

        watch(() => props.task.status, (newVal) => {
            isChecked.value = newVal;
        });

        const onMouseLeave = () => {
            menuVisible.value = false;
        };

        const toggleMenu = () => {
            menuVisible.value = !menuVisible.value
        };

        const openEditModal = () => {
            taskToEdit.value = { 
                id: props.task.id, 
                title: props.task.title, 
                description: props.task.description, 
                category: { ...props.task.category }  // Faz uma cópia da categoria
            };
            isEditModalVisible.value = true;
        };

        const closeEditModal = () => {
            isEditModalVisible.value = false;
        };

        const categoryClass = computed(() => taskStore.categoryClass(props.task.category.name));

        const openDeleteModal = () => {
            taskToDelete.value = props.task.id;
            
            isDeleteModalVisible.value = true;
        };

        return {
            isChecked,
            categoryClass,
            handleCheckboxChange,
            onMouseLeave,
            toggleMenu,
            menuVisible,
            openEditModal,
            closeEditModal,
            taskLabelRef,
            taskToEdit,
            isEditModalVisible,
            isDeleteModalVisible,
            openDeleteModal,
            taskToDelete
        };
    }
}
</script>

<style lang="stylus">
@import './task-label.styl'
.modal-open .task-options {
    display: none;
}
</style>
