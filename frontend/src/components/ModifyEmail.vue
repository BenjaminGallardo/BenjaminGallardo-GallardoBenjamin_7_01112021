<template>
    <article>
        <hr>

        <h2>Adresse-Email :</h2>
        <p>{{ userInformations.email }}</p>

        <form>
            <label for="email-modify">Nouvelle adresse email :</label> <br>
            <input type="text" id="email-modify" name="email-modify" v-model="inputModifyEmail" @input="verifyEmail" >
            
            
            <button type="submit" @click.prevent="modifyEmail" v-if="check == null || check == true">Modifier</button>

            <div class="verificationFormEmail">
                <i class="fas fa-check check" v-if="check == true"></i> 
                <i class="fas fa-times error" v-if="check == false"></i>
                <span v-if="check == false || errorMsg != ''">L'adresse email n'a pas le bon format</span>
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
               inputModifyEmail: '',
               check: null,
               errorMsg: ''
           }
       },
       props:['userInformations'],
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
                   id: this.$store.state.userId,
                   email : this.inputModifyEmail
               }, this.$store.state.headers)
               .then(response => {
                   console.log(response);

                    setTimeout(function(){ 
                    window.location.href="http://localhost:8080/profile"
                    }, 1000)
                    return;
               })
               .catch(error => {
                   this.errorMsg = error.response.data.error;
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

            @include mobile-tablet {
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

        @include laptopL {
            font-size: 25px;
        }
    }

    p {
        color: $color-text;

        @include laptopL {
            font-size: 18px;
        }
    }

    label {
        color: $color-text;
        text-decoration: underline;

        @include laptopL {
            font-size: 18px;
        }
    }

    input {
        margin-top: 0.5em;
        width: 20em;

        @include laptopL {
            font-size: 15px;
        }

        @include mobile-tablet {
            margin-right: 0.5em 
        }
    }

    button {
        @include btn-modify;

        @include laptopL {
            font-size: 15px;
        }   

        @include mobile-tablet {
            margin: 0.5em 0 0 0;
        }
    }

    .verificationFormEmail {
        .check {
            color: green;
            position: absolute;
            bottom: 0.2em;
            left: -1.3em;

            @include mobile-tablet {
                display: none;
            }
        }

        .error {
            color: red;
            position: absolute;
            bottom: 1.7em;
            left: -1.1em;

            @include mobile-tablet {
                display: none;
            }
        }

        span {
            font-size: 12px;
            flex-wrap: wrap;
            font-style: italic;
            color: $color-text;
            color: red;
        }
    }
</style>