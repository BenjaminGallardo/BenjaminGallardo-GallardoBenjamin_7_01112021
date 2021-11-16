<template>
    <section>
        <h1>Les membres :</h1>
        <ul>
            <li :key="index" v-for="(member, index) in members"><router-link :to="`/member/${member.id}`"> <i class="fas fa-user"></i>{{ member.username }}</router-link></li>
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
            .get('http://localhost:3001/api/member')
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

        li {
            line-height: 2em;
            list-style-type: none;

            i {
                margin-right: 0.5em;
            }

            a {
                color: $color-text;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>

