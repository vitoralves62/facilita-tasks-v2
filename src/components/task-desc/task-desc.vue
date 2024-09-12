<template>
    <div class="desc-container">
        <legend class="desc-legend">Descrição:</legend>
        <textarea 
            class="task-desc-main"
            v-model="localDescription"
            @input="updateDescription"
        ></textarea>
    </div>
</template>

<script>
    export default {
        name: 'TaskDescription',
        props: ['value'],
        data() {
            return {
                localDescription: this.value
            }
        },
        methods: {
            updateDescription(){
                this.$emit('input', this.localDescription)
            }
        }
    }
</script>

<styles lang="stylus">
    @import './task-desc.styl'
</styles>