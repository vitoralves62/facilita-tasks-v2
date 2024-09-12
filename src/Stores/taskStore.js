import { defineStore } from "pinia";
import taskDTO from "@/Model/taskDTO";
import CategoryDTO from "@/Model/categoryDTO";

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [],
        nextId: 1,
        categorie: [
            new CategoryDTO('Urgente'),
            new CategoryDTO('Importante'),
            new CategoryDTO('Normal')
        ]
    }),
    actions: {
        addTask(title, description, categoryName) {
            const category = this.categorie.find(cat => cat.name === categoryName) || new CategoryDTO('Normal');
            const newTask = new taskDTO(this.nextId++, title, description, category, false);
            this.$patch({
                tasks: [...this.tasks, newTask]
            });
            this.saveTasks();
        },

        updateTask(id, updatedTitle, updatedDescription, updatedCategoryName) {
            const taskIndex = this.tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                const updatedCategory = this.categorie.find(cat => cat.name === updatedCategoryName);
                if (!updatedCategory) {
                    console.error(`Categoria ${updatedCategoryName} não encontrada`);
                    return;
                }
                this.tasks[taskIndex].title = updatedTitle;
                this.tasks[taskIndex].description = updatedDescription;
                this.tasks[taskIndex].category = updatedCategory;
                this.saveTasks();
            }
        },

        deleteTask(id){
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
        },

        toggleTaskStatus(id) {
            const taskIndex = this.tasks.findIndex(task => task.id === id);
            if(taskIndex !== -1) {
                this.tasks[taskIndex].status = !this.tasks[taskIndex].status;
                this.$patch({
                    tasks: [...this.tasks]
                });
                this.saveTasks();
            }
        },

        saveTasks() {
            const tasksToSave = this.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                category: task.category.name,
                status: task.status
            }));
            localStorage.setItem('tasks', JSON.stringify(tasksToSave));
            localStorage.setItem('nextId', this.nextId.toString());
        
            // Usar o método $patch para garantir que as mudanças sejam detectadas reativamente
            this.$patch({
                tasks: this.tasks
            });
        },

        loadTasks(){
            const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
            this.$patch({
                tasks: tasksFromStorage.map(task => new taskDTO(
                    task.id,
                    task.title,
                    task.description,
                    new CategoryDTO(task.category),
                    task.status
                )),
                nextId: parseInt(localStorage.getItem('nextId')) || 1
            });
        }
        
    },
    getters: {
        totalTasks: (state) => state.tasks.length,
        urgentTasks: (state) => state.tasks.filter(task => task.category.name === 'Urgente' && task.status !== true),
        importantTasks: (state) => state.tasks.filter(task => task.category.name === 'Importante' && task.status !== true),
        normalTasks: (state) => state.tasks.filter(task => task.category.name === 'Normal' && task.status !== true),
        completedTasks: (state) => state.tasks.filter(task => task.status),
        pendingTasks: (state) => state.tasks.filter(task => task.status !== true),
        getTaskById: (state) => (id) => state.tasks.find(task => task.id === id),
        tasksByCategory: (state) => (categoryName) => state.tasks.filter(task => task.category.name === categoryName),
        categoryClass: () => (categoryName) => {
            const categoryClasses = {
                'Urgente': 'urgent',
                'Importante': 'important',
                'Normal': 'normal'
            };
            return categoryClasses[categoryName] || '';
        }
    }
});
