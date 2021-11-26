<template>
    <article>
        <h2>Modifier le mot de passe :</h2>
        <form id="modify-password">
            <div class="form-style">
                <label for="old-password" >Ancien mot de passe :</label> <br>
                <input type="password" id="old-password" v-model="oldPassword">
            </div>

            <div class="form-style">
                <label for="new-password">Nouveau mot de passe :</label> <br>
                <input type="password" id="new-password" v-model="newPassword" @input="verifyPassword"> <br>

                <i class="fas fa-check check" v-if="checkOne == true"></i>
                <i class="fas fa-times error" v-if="checkOne == false"></i>
                <span v-if="checkOne == false">Le mot de passe doit contenir une majuscule, <br> un chiffre et un caractère spécial ( * . $ ? ! ^ % )</span>
            </div>

            <div class="form-style">
                <label for="confirm-new-password">Confirmer nouveau mot de passe :</label> <br>
                <input type="password" id="confirm-new-password" v-model="confirmNewPassword" @input="verifyConfirmPassword">
                
                <button type="submit" @click.prevent="sendModifyPassword" v-if="checkOne == null || checkOne == true && checkTwo == null || checkTwo == true">Modifier</button> <br>

                <i class="fas fa-check check" v-if="checkTwo == true"></i>
                <i class="fas fa-times error" v-if="checkTwo == false"></i>
                <span v-if="checkTwo == false">Les deux mots de passe sont différents</span>
            </div>

            <p class="msg-modified-password" v-if="modifiedPassword != ''">{{ modifiedPassword }}</p>
            <p class="msg-error-modified-password" v-if="msgError != '' && modifiedPassword == ''">{{ msgError }}</p>
        </form>
    </article>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ModifyPassword',

        data(){
            return {
                newPassword: "",
                confirmNewPassword: "",
                oldPassword: "",
                checkOne: null,
                checkTwo: null,
                modifiedPassword: "",
                msgError: ''
            }
        },

        methods :{
            verifyPassword(event){        
                const specialCaracter = /[^a-zA-Z0-9]/;
                const alphabet = /[a-z]/i;
                const numbers = /[0-9]/;

                let objectValidation = {
                    symbol : 0,
                    letter : 0,
                    number : 0
                }

                this.inputValues = event.target.value;

                if(this.inputValues.search(specialCaracter) !== -1){
                    objectValidation.symbol = 1;
                }
                if(this.inputValues.search(alphabet) !== -1){
                    objectValidation.letter = 1;
                }
                if(this.inputValues.search(numbers) !== -1){
                    objectValidation.number = 1;
                }

                if(event.inputType == 'deleteContentBackward'){
                    if(this.inputValues.search(specialCaracter) === -1){
                        objectValidation.symbol = 0;
                    }
                    if(this.inputValues.search(alphabet) === -1){
                        objectValidation.letter = 0;
                    }
                    if(this.inputValues.search(numbers) === -1){
                        objectValidation.number = 0;
                    }
                } 

                let objectValidationTestAll = 0;

                for(const property in objectValidation){
                    if(objectValidation[property] > 0){
                        objectValidationTestAll++;
                    }
                }

                if(objectValidationTestAll < 3){
                    this.checkOne = false; 

                } else {
                    this.checkOne = true;
                }
            },

            verifyConfirmPassword(event){
                if(event.target.value.length === 0){
                    this.checkTwo = false;
                
                } else if(event.target.value === this.inputValues){
                    this.checkTwo = true;

                } else {
                    this.checkTwo = false;
                }
            },

            sendModifyPassword(){
                axios
                .put(`http://localhost:3001/api/profile/password`, {
                    id: this.$store.state.user.userId,
                    oldPassword: {
                        password: `${this.oldPassword}`
                    },
                    newPassword: {
                        password: `${this.newPassword}`
                    }
                }, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
                .then(response => {
                    this.modifiedPassword = response.data.message; 
                    setTimeout(function(){window.location.reload(); }, 1000);
                })
                .catch(error => {
                    this.msgError = error.response.data.error;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    article {

        @include laptopL {
            margin-top: 5em;
        }
    }

    h2 {
        font-size: 18px;
        color: $color-text;
        text-decoration: underline;

        @include laptopL {
            font-size: 25px;
        }
    }

    form {
        color: $color-text;

        label {
            margin-top: 0.5em;

            @include laptopL {
                font-size: 18px;
            }
        }

        input {
            margin: 0.5em 0;
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
                margin-left: 0;
            }
        }

        .form-style {
            position: relative;

            .check {
                color: green;
                position: absolute;
                top: 2.1em;
                left: -1.3em;

                @include mobile-tablet {
                    display: none;
                }
            }

            .error {
                color: red;
                position: absolute;
                top: 2.1em;
                left: -1.1em;
                
                @include mobile-tablet {
                    display: none;
                }
            }

            span {
                font-size: 12px;
                flex-wrap: wrap;
                font-style: italic;
                color: red;
            }
        }

        .msg-modified-password {
            color: #05d157;
            font-size: 13px;
        }

        .msg-error-modified-password {
            color: red;
            font-size: 13px;
        }
    }

</style>