<template>
    <div>
        <h2>Adresse-Email :</h2>
        <p>{{ email }}</p>

        <form method="post">
            <label for="email-modify">Nouvelle adresse email :</label> <br>
            <input type="text" id="email-modify" name="email-modify">
            
            <button>Modifier</button>
        </form>
    </div>
</template>

<script>
    export default {
       name: 'ModifyEmail',
       data(){
           return {
               email: "Benjamin.Gallardo1@outlook.fr"
           }
       }
    }
</script>

<style scoped>
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
        padding: 0.3em;
        margin-left: 1em;
    }
</style>