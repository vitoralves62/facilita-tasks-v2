<template>
    <div class="title-container">
        <legend class="title-legend">Título:</legend>
        <input
            class="task-title-main" id="title"
            v-model="localTitle" @input="updateTitle"
            :maxlength="maxTitleLength"
        />
    </div>
</template>

<script>
    export default {
        name: 'TaskTitle',
        props: {
            value: String,
            maxTitleLength: {
                type: Number,
                default: 60
            }
        },
        data() {
            return {
            localTitle: this.value
            }
        },
        methods: {
            updateTitle() {
            this.$emit('input', this.localTitle);
            }
        }
    }
</script>

<styles lang="stylus">
    @import './task-title.styl'
</styles>