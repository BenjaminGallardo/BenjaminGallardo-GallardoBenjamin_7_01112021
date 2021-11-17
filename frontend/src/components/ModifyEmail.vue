<template>
    <article>
        <hr>

        <h2>Adresse-Email :</h2>
        <p>{{ email }}</p>

        <form>
            <label for="email-modify">Nouvelle adresse email :</label> <br>
            <input type="text" id="email-modify" name="email-modify" v-model="inputModifyEmail" @input="verifyEmail" >
            
            
            <button type="submit" @click="modifyEmail" v-if="check == null || check == true">Modifier</button>

            <div class="verificationFormEmail">
                <i class="fas fa-check check" v-if="check == true"></i> 
                <i class="fas fa-times error" v-if="check == false"></i>
                <span v-if="check == false">L'adresse email n'a pas le bon format</span>
            </div>
        </form>
    </article>
</template>

<script>
    import axios from 'axios'

    export default {
       name: 'ModifyEmail',
       data(){
           return {
               email: "Benjamin.Gallardo1@outlook.fr",
               inputModifyEmail: '',
               check: null,
           }
       },
       methods:{
            verifyEmail: function(event){
                const regexEmail = /\S+@\S+\.\S+/;

                if(event.target.value.search(regexEmail) === 0){
                    this.check = true;

                } else if(event.target.value.search(regexEmail) === -1){
                    this.check = false;
                }
            },

           modifyEmail(){
               axios
               .put(`http://localhost:3001/api/profile/email`, {
                   id: 55,
                   email : this.inputModifyEmail
               })
               .then(response => {
                   console.log(response);
               })
               .catch(error => {
                   console.log(error);
               })   
           }
       }
    }
</script>

<style lang="scss" scoped>
    article {
        position: relative;

        hr {
            display: none;

            @include mobile {
                display: flex;
                margin-top: 2em;
            }
        }
    }

    h2 {
        font-size: 18px;
        color: $color-text;
        text-decoration: underline;
        line-height: 0.5em;
    }

    p {
        color: $color-text;
    }

    label {
        color: $color-text;
        text-decoration: underline;
    }

    input {
        margin-top: 0.5em;
        width: 20em;

        @include mobile {
            margin-right: 0.5em 
        }
    }

    button {
        @include btn-modify;
        @include mobile {
            margin: 0.5em 0 0 0;
        }
    }

    .verificationFormEmail {
        .check {
            color: green;
            position: absolute;
            bottom: 0.2em;
            left: -1.3em;
        }

        .error {
            color: red;
            position: absolute;
            bottom: 1.7em;
            left: -1.1em;
        }

        span {
            font-size: 12px;
            flex-wrap: wrap;
            font-style: italic;
            color: $color-text;
        }
    }
</style>