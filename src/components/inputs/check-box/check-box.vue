<template>
    <label class="custom-checkbox-container">
        <input type="checkbox" class="input-checkbox" :checked="checked" @change="emitChange"/>
        <span class="checkmark"></span>
    </label>
</template>

<script>
export default {
    name: 'CustomCheckbox',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            checked: this.value
        };
    },
    watch: {
        value(newVal) {
            this.checked = newVal;
        }
    },
    methods: {
        emitChange(event) {
            this.checked = event.target.checked; // Update internal state
            this.$emit('input', this.checked); // Emit the correct event for v-model
            this.$emit('change', this.checked); // Emit the change event with the new value
        }
    }
};
</script>

<style lang="stylus">
@import './check-box.styl';
</style>
