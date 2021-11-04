<template>
    <div>
        <Nav />

        <section class="member-profile">
            <i class="fas fa-user fa-5x"></i> 
            <h2>{{ member.username }}</h2>
            <p>{{ member.email }}</p>
            <p>{{ member.bio }}</p>
        </section>
    </div>
</template>

<script>
    import Nav from '../components/Nav.vue'
    import axios from 'axios'

    export default {
        name: "Member",
        components: {
            Nav
        },
        data(){
            return {
                id: this.$route.params.id,
                member : []
            }
        },
        mounted(){
            axios
            .get(`http://localhost:3000/member/${this.id}`)
            .then(response => {
                console.log(response.data[0]);
                this.member = response.data[0];
            })
        }
    }
</script>

<style lang="scss" scoped>
    .member-profile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 70vh;
        color: white;
    }
</style>