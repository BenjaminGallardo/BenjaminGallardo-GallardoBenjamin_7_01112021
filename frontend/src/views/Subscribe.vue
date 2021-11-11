<template>
    <div id="subscribe">
        <header>
            <nav>
                <img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania">
                <router-link to="connexion">Connexion</router-link>
            </nav>
        </header>
        <main>
            <section>
                <form id="form-inscription">
                    <div class="form-container">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" v-model="user.username" @input="verifyUsername">
                        <i class="fas fa-check check"></i>
                        <i class="fas fa-times error"></i>
                        <span>Nom d'utilisateur entre 3 et 50 caractères</span>
                    </div>

                    <div class="form-container">
                        <label for="email">Adresse-email :</label>
                        <input type="email" id="email" v-model="user.email" @input="verifyEmail">
                        <i class="fas fa-check check"></i>
                        <i class="fas fa-times error"></i>
                        <span>L'adresse email n'a pas le bon format</span>
                    </div>

                    <div class="form-container">
                        <label for="password">Mot de passe :</label>
                        <input type="password" id="password" v-model="user.password" @input="verifyPassword">
                        <i class="fas fa-check check"></i>
                        <i class="fas fa-times error"></i>
                        <span>Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial</span>
                    </div>

                    <div class="form-container">
                        <label for="confirm-password">Confirmer le mot de passe :</label>
                        <input type="password" id="confirm-password" @input="verifyConfirmPassword">
                        <i class="fas fa-check check"></i>
                        <i class="fas fa-times error"></i>
                        <span>Les deux mots de passe sont différents</span>
                    </div>

                    <button @click="sendForm">Inscription</button>
                    <div class="no-click"></div>
                </form>

                <img src="../assets/phone.png" alt="">
            </section>
        </main>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
        name: 'Subscribe',
        
        data(){
            return{
                user: {
                    username: '',
                    email: '',
                    password: ''
                },
            }
        },

        methods: {
            verifyUsername : function(event){
                const checkInput = document.querySelectorAll('.check');
                const errorInput = document.querySelectorAll('.error');
                const msgError = document.querySelectorAll('span');

                if(event.target.value.length >= 3 && event.target.value.length <= 50){
                    checkInput[0].style.display = "flex";
                    errorInput[0].style.display = "none";
                    msgError[0].style.display = "none";
                } 
                        
                else {
                    errorInput[0].style.display = "flex";
                    msgError[0].style.display = "flex";
                    checkInput[0].style.display = "none";
                }
            },

            verifyEmail: function(event){
                const checkInput = document.querySelectorAll('.check');
                const errorInput = document.querySelectorAll('.error');
                const msgError = document.querySelectorAll('span');
                const regexEmail = /\S+@\S+\.\S+/;

                if(event.target.value.search(regexEmail) === 0){
                    checkInput[1].style.display = "flex";
                    errorInput[1].style.display = "none";
                    msgError[1].style.display = "none";

                } else if(event.target.value.search(regexEmail) === -1){
                    errorInput[1].style.display = "flex";
                    checkInput[1].style.display = "none";
                    msgError[1].style.display = "flex";
                }
            },

            verifyPassword: function(event){
                const checkInput = document.querySelectorAll('.check');
                const errorInput = document.querySelectorAll('.error');
                const msgError = document.querySelectorAll('span');
        
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
                    checkInput[2].style.display = "none";
                    errorInput[2].style.display = "flex";
                    msgError[2].style.display = "flex";

                } else {
                    checkInput[2].style.display = "flex";
                    errorInput[2].style.display = "none";
                    msgError[2].style.display = "none";
                }
            },

            verifyConfirmPassword: function(event){
                const checkInput = document.querySelectorAll('.check');
                const errorInput = document.querySelectorAll('.error');
                const msgError = document.querySelectorAll('span');
                
                if(event.target.value.length === 0){
                    errorInput[3].style.display = "flex";
                    checkInput[3].style.display = "none";
                    msgError[3].style.display = "flex";
                
                } else if(event.target.value === this.inputValues){
                    checkInput[3].style.display = "flex";
                    errorInput[3].style.display = "none";
                    msgError[3].style.display = "none";

                } else {
                    errorInput[3].style.display = "flex";
                    checkInput[3].style.display = "none";
                    msgError[3].style.display = "flex";
                }
            },
            
            sendForm: function(){
                axios
                .post('http://localhost:3001/api/auth/subscribe', {
                    username: `${this.user.username}`,
                    email :`${this.user.email}`,
                    password: `${this.user.password}`
                })
                .then(response => console.log(response));
                }
            }
        }
</script>

<style lang='scss' scoped>
        header {

            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 1em;

                img {
                    width: 20em;
                }

                a{
                    text-decoration: none;
                    color: white;
                    font-size: 18px;

                    &:hover {
                        color: #365665;
                        transform: scale(1.1);
                        transition: 0.3s;
                    }
                }
            }
        }

    section {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 3em;
        height: 70vh;

        img {
            width: 12em;
        }

        form {
            background: rgba($color: #000000, $alpha: 0.6);
            border-radius: 1em;
            padding: 2em 3em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            
            .form-container {
                display: flex;
                flex-direction: column;
                color: white;
                margin: 0.5em 1em;
                max-width: 14em;
                position: relative;

                input {
                    margin: 0.3em 0;
                    width: 17em;
                }

                .check {
                    display: none;
                    color: green;
                    position: absolute;
                    top: 1.8em;
                    right: -2em;
                }

                .error {
                    display: none;
                    color: red;
                    position: absolute;
                    top: 1.9em;
                    right: -1.8em;
                }

                span {
                    display: none;
                    font-size: 12px;
                    flex-wrap: wrap;
                    font-style: italic;
                }
            }

            button {
                margin-top: 1em;
                padding: 0.5em;
                color: white;
                background-color: #3f4f83;
                border: none;
                border-radius: 0.5em;
                cursor: pointer;
                font-size: 15px;
            }
        }
    }
</style>