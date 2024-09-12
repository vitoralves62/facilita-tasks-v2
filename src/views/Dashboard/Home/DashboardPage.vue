<template>
    <div class="main-container-home">
        
        <CategorieBar 
            class="categories-bar-main"
            @category-selected="filterTasksByCategory"
        />
        <HeaderMain 
            class="header-main"
        />
        <SidebarMain
            class="side-bar-main"
        />
        <div class="tasks-container">
            <p class="tasks-container-title">Minhas Tarefas</p>
            <p class="tasks-container-subtitle">
                Olá <span class="name">{{ user.username }}</span>, você tem <span class="tasks"> {{ filteredTasks.length }} </span><span class="taskLabel">{{ taskLabel }}</span> <span>{{ pendenceLabel }}</span>
            </p>
            <SearchBar 
                class="search-bar-home"
                @search="filterTasksBySearch"
            />
            <div v-for="task in sortedAndFilteredTasks" :key="task.id" class="task-label-home">
                <TaskLabel :task="task"/>
            </div>
        </div>
        <button @click="openModal" class="add-task-button">+</button>
        <CreateTaskModal
            :isVisible="isVisible"
            @close="closeModal"
        />
    </div>
</template>

<script>

import SidebarMain from '@/components/sidebar/sidebar-main.vue';
import CategorieBar from '@/components/categories-bar/categorie-bar.vue';
import HeaderMain from '@/components/header/header-main.vue';
import CreateTaskModal from '@/components/modals/create-task-modal/create-task-modal.vue';
import SearchBar from '@/components/search-bar/search-bar.vue';
import TaskLabel from '@/components/task-label/task-label.vue';

import { useTaskStore } from '@/Stores/taskStore';
import { useUserStore } from '@/Stores/userStore';

export default {
    name: "DashboardPage",
    components: {
        SidebarMain,
        CategorieBar,
        HeaderMain,
        CreateTaskModal,
        SearchBar,
        TaskLabel
    },
    data() {
        return {
            isVisible: false,
            searchQuery: '',
            selectedCategory: 'Todas'
        };
    },
    computed: {
        taskStore() {
            return useTaskStore();
        },
        userStore() {
            return useUserStore();
        },
        filteredTasks() {
            let tasks = this.taskStore.tasks;

            // Se 'Todas' for selecionada, mostrar todas as tarefas não finalizadas
            if (this.selectedCategory === 'Todas') {
                tasks = tasks.filter(task => task.status !== true);
            }

            // Se 'Finalizadas' for selecionada, mostrar apenas tarefas finalizadas
            else if (this.selectedCategory === 'Finalizadas') {
                tasks = tasks.filter(task => task.status === true);
            }

            // Caso contrário, filtrar pela categoria selecionada
            else if (this.selectedCategory) {
                tasks = tasks.filter(task => task.category.name === this.selectedCategory && task.status !== true);
            }

            // Filtrar pela query de busca se for especificada
            if (this.searchQuery) {
                tasks = tasks.filter(task => 
                    task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    task.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            return tasks;
        }
        ,
        sortedAndFilteredTasks() {
            let tasks = this.filteredTasks;

            // Sorting logic
            return tasks.sort((a, b) => {
                const priorities = ['Urgente', 'Importante', 'Normal'];
                return priorities.indexOf(a.category.name) - priorities.indexOf(b.category.name);
            });
        },
        taskLabel() {
            return this.filteredTasks.length === 1 ? 'tarefa' : 'tarefas';
        },
        pendenceLabel() {
            return this.filteredTasks.length === 1 ? 'pendente.' : 'pendentes.';
        },
        user() {
            return this.userStore.user;
        }
    },
    methods: {
        filterTasksByCategory(category) {
            this.selectedCategory = category;
        },
        filterTasksBySearch(searchQuery) {
            this.searchQuery = searchQuery;
        },
        openModal() {
            this.isVisible = true;
        },
        closeModal() {
            this.isVisible = false;
        }
    },
    created() {
        this.userStore.loadUser();
        this.taskStore.loadTasks();
    }

};
</script>

<style lang="stylus">
    @import './DashboardPage.styl';
</style>