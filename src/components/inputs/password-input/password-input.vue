<template>
    <input
        type="password"
        :value="value"
        @input="updateValue"
        class="password-input"
    />
</template>

<script>
export default {
    name: 'PasswordInput',
    props: {
        value: {
            type: String,
            required: true
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value);
        }
    }
}
</script>

<style lang="stylus">
@import './password-input.styl';
</style>
