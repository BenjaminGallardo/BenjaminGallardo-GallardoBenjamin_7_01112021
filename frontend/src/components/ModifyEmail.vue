<template>
    <div>
        <h2>Adresse-Email :</h2>
        <p>{{ email }}</p>

        <form>
            <label for="email-modify">Nouvelle adresse email :</label> <br>
            <input type="text" id="email-modify" name="email-modify" v-model="inputModifyEmail">
            
            <button type="submit" @click="modifyEmail">Modifier</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
       name: 'ModifyEmail',
       data(){
           return {
               email: "Benjamin.Gallardo1@outlook.fr",
               inputModifyEmail: ''
           }
       },
       methods:{
           modifyEmail(){
               axios
               .put(`http://localhost:3001/api/profile/email`, {
                   id: 34,
                   email : this.inputModifyEmail
               })
               .then(response => {
                   console.log(response);
               })
           }
       }
    }
</script>

<style lang="scss" scoped>
    h2 {
        font-size: 18px;
        color: white;
        text-decoration: underline;
    }

    p {
        color: white;
    }

    label {
        color: white;
        text-decoration: underline;
    }

    input {
        margin-top: 0.5em;
        width: 20em;
    }

    button {
        background-color: #05d157;
        color: white;
        border: none;
        border-radius: 0.2em;
        margin-left: 1em;
        padding: 0.3em 0.5em;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
            transition: 0.5s;
        }
    }
</style>