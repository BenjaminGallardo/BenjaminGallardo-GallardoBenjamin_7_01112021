<template>
    <div>
        <Nav />
        <Members />
    </div>
</template>

<script>
    import Nav from '../components/Nav.vue'
    import Members from '../components/Members.vue'

    export default {
        name: 'Home',
        components: {
            Nav,
            Members
        }
    }
</script>

<style scoped>
</style>