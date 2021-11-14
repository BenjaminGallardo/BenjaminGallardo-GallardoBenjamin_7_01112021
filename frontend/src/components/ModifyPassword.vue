<template>
    <div>
        <h2>Modifier le mot de passe :</h2>
        <form method="post">

            <div>
                <label for="old-password" >Ancien mot de passe :</label> <br>
                <input type="password" id="old-password" v-model="oldPassword">
            </div>

            <div>
                <label for="new-password">Nouveau mot de passe :</label> <br>
                <input type="password" id="new-password" v-model="newPassword">
            </div>

            <div>
                <label for="confirm-new-password">Confirmer nouveau mot de passe :</label> <br>
                <input type="password" id="confirm-new-password">
                
                <button type="submit" @click.prevent="modifyPassword">Modifier</button>
            </div>

            
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ModifyPassword',
        data(){
            return {
                newPassword: "",
                oldPassword: ""
            }
        },
        methods :{
            modifyPassword(){
                axios
                .put(`http://localhost:3001/api/profile/password`, {
                    id: 45,
                    oldPassword: {
                        password: `${this.oldPassword}`
                    },
                    newPassword: {
                        password: `${this.newPassword}`
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
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
        margin-left: 1em;
        padding: 0.3em 0.5em;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
            transition: 0.5s;
        }
    }
</style>