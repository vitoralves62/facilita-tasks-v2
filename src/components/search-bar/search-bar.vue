<template>
    <div class="search-container">
        <input
            type="text"
            class="search-bar-main"
            placeholder="Buscar Tarefas"
            v-model="searchQuery"
            @input="onSearch"
        />
        <img
            src="@/assets/imgs/search-regular1.svg"
            class="search-icon"
        />
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        data() {
            return {
                searchQuery: ''
            }
        },
        methods: {
            onSearch() {
                this.$emit('search', this.searchQuery);
            }
        }
    }
</script>

<style lang="stylus">
    @import './search-bar.styl'
</style>