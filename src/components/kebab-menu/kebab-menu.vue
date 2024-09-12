<template>
    <div v-show="show" class="kebab-menu-container">
        <div class="kebab-menu-main">
            <div class="buttons-container">
                <button class="edit-button" @click="openTaskEdit()" :class="{ 'task-label-menu-opened': showEditTask }">
                    <span class="dot green-dot"></span>Editar
                </button>
                <button class="delete-button" @click="openTaskDelete(taskId)" :class="{ 'task-label-menu-opened': showRemoveModal }">
                    <span class="dot gray-dot"></span>Excluir
                </button>
            </div>
            <button class="task-options-kebab" @click="toggleMenu">
                <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.57895 5.92105C2.4523 5.92105 3.15789 6.62665 3.15789 7.5C3.15789 8.37336 2.4523 9.07895 1.57895 9.07895C0.705592 9.07895 0 8.37336 0 7.5C0 6.62665 0.705592 5.92105 1.57895 5.92105ZM0 1.57895C0 2.4523 0.705592 3.15789 1.57895 3.15789C2.4523 3.15789 3.15789 2.4523 3.15789 1.57895C3.15789 0.705592 2.4523 0 1.57895 0C0.705592 0 0 0.705592 0 1.57895ZM0 13.4211C0 14.2944 0.705592 15 1.57895 15C2.4523 15 3.15789 14.2944 3.15789 13.4211C3.15789 12.5477 2.4523 11.8421 1.57895 11.8421C0.705592 11.8421 0 12.5477 0 13.4211Z" fill="currentColor"/>
                    </svg>
            </button>
        </div>
    </div>
</template>

<script>
    import { ref, watch } from 'vue';
    export default {
        name: 'KebabMenu',
        props: {
            taskId: {
                type: Number,
                required: true
            },
            showEditTask: {
                type: Boolean,
                default: false
            },
            showRemoveModal: {
                type: Boolean,
                default: false
            },
            showKebabMenu: {
                type: Boolean,
                default: false
            }
        },
        setup(props, {emit}) {
            const show = ref(props.showKebabMenu);
            const menuVisible = ref(null);

            watch(() => props.showKebabMenu, (newValue) => {
                show.value = newValue;
            });

            const toggleMenu = () => {
                menuVisible.value = !menuVisible.value;
            };

            const openTaskEdit = () => {
                emit('open-task-edit', props.taskId);
            };

            const openTaskDelete = (taskId) => {
                emit('open-task-delete', taskId);
            };

            const clickIcon = () => {
                emit('click-icon');
            };

            return { show, openTaskEdit, openTaskDelete, clickIcon, toggleMenu, menuVisible };
        }
    }
</script>

<style lang="stylus">
    @import './kebab-menu.styl'
</style>
