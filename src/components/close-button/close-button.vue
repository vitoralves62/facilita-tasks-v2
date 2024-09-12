<template>
    <div>
        <button @click="$emit('close')" class="close-button">
            <img
                src="@/assets/imgs/closeButton.svg"
            />
        </button>
    </div>
</template>

<script>
    export default {
        name: 'CloseButton'
    }
</script>

<styles lang="stylus">
    @import './close-button.styl'
</styles>