<template>
    <div>
        <h2>Modifier le mot de passe :</h2>
        <form method="post">

            <div>
                <label for="old-password">Ancien mot de passe :</label> <br>
                <input type="password" id="old-password">
            </div>

            <div>
                <label for="new-password">Nouveau mot de passe :</label> <br>
                <input type="password" id="new-password">
            </div>

            <div>
                <label for="confirm-new-password">Confirmer nouveau mot de passe :</label> <br>
                <input type="password" id="confirm-new-password">
                
                <button>Modifier</button>
            </div>

            
        </form>
    </div>
</template>

<script>
    export default {
        name: 'ModifyPassword'
    }
</script>

<style scoped>
    h2 {
        font-size: 18px;
        color: white;
        text-decoration: underline;
    }

    form {
        color: white;
    }

    input {
        margin: 0.5em 0;
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