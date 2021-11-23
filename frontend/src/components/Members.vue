<template>
    <section>
        <h1>Les membres :</h1>
        <ul>
            <li class="list-members" :key="index" v-for="(member, index) in members"><router-link :to="`/member/${member.id}`"><img :src="member.imageUrl" alt=""> {{ member.username }}</router-link></li>
        </ul>
    </section>
</template>

<script>
     import axios from 'axios'

    export default {
        name: 'Members',
        data(){
            return {
                members: [],
            }
        },
        created(){
            axios
            .get('http://localhost:3001/api/member', {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
            .then(response => {
                for(const user of response.data){
                    this.members.push(user)
                }
            })
        }
    }
</script>

<style  lang="scss" scoped>
    h1 {
        color: $color-text;
        text-decoration: underline;
    }

    ul {
        margin: 0;
        padding: 0;

        .list-members {
            list-style-type: none;
            margin-bottom: 0.5em;

            img {
                margin-right: 0.5em;
                width: 2em;
                border-radius: 50%;
            }

            a {
                color: $color-text;
                text-decoration: none;
                display: flex;
                align-items: center;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>

