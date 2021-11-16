<template>
    <div>
        <header-nav></header-nav>

        <section class="member-profile">
            <i class="fas fa-user fa-5x"></i> 
            <h1>{{ member.username }}</h1>
            <p>{{ member.email }}</p>
            <p class="bio" v-if="member.bio !== null">{{ member.bio }}</p>
        </section>
    </div>
</template>

<script>
    import HeaderNav from '../components/HeaderNav.vue'
    import axios from 'axios'

    export default {
        name: "Member",
        components: {
            HeaderNav
        },
        data(){
            return {
                id: this.$route.params.id,
                member : []
            }
        },
        mounted(){
            axios
            .get(`http://localhost:3001/api/member/${this.id}`)
            .then(response => {
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
        color: $color-text;

        .bio {
            color: black;
            background: $color-text;
            padding: 1em;
        }
    }
</style>