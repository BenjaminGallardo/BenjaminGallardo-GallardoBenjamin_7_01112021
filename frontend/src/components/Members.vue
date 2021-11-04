<template>
    <section>
        <h2>Les membres :</h2>
        <ul>
            <li v-for="member in members" :key="member"><i class="fas fa-user"></i> {{ member.username }}</li>
        </ul>
    </section>
</template>

<script>
     import axios from 'axios'

    export default {
        name: 'Members',
        data(){
            return {
                members: []
            }
        },
        mounted(){
            axios
            .get('http://localhost:3000/home')
            .then(response => {
                this.members = response.data;
            })
        }
    }
</script>

<style  lang="scss" scoped> 
    h2 {
        color: white;
        text-decoration: underline;
    }

    ul {
        margin: 0;
        padding: 0;

        li {
            color: white;
            line-height: 2em;
            list-style-type: none;
        }
    }
</style>

