<template>
    <div>
        <header-nav></header-nav>

        <section class="member-profile">
            <img :src="member.imageUrl">
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
            .get(`http://localhost:3001/api/member/${this.id}`, this.$store.state.headers)
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
        height: 90vh;
        color: $color-text;
        margin-top: 1em;

        img {
            width: 12em;
        }

        .bio {
            color: black;
            background: $color-text;
            padding: 1em;
        }
    }
</style>