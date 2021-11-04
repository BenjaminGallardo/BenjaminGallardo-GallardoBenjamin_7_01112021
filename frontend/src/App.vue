<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'app',
    components: {
    }
}
</script>

<style lang="scss">
    @font-face {
        font-family: 'Poppins';
        src: url('./assets/fonts/Poppins.ttf');
    }

    html {
        background-image: url('./assets/background.png');
        background-size: cover;
        background-repeat: no-repeat;

        body {
            font-family: 'Poppins';
        }
    }
</style>
