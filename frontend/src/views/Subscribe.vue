<template>
    <div id="subscribe">
        <header>
            <nav>
                <img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania">
                <router-link to="connexion"><h1>Connexion</h1></router-link>
            </nav>
        </header>
        <main>
            <section>
                <form id="form-inscription">
                    <p class="msg-error" v-if="status == 'error-created'">{{ errorMsg }}</p>
                    <div class="form-container">
                        <label for="username">Nom d'utilisateur :</label>
                        <input type="text" id="username" v-model="user.username" @input="verifyUsername" placeholder="Prénom Nom">
                        <i class="fas fa-check check" v-if="checkOne == true"></i>
                        <i class="fas fa-times error" v-if="checkOne == false"></i>
                        <span v-if="checkOne == false">Nom d'utilisateur entre 3 et 50 caractères</span>
                    </div>

                    <div class="form-container">
                        <label for="email">Adresse-email :</label>
                        <input type="email" id="email" v-model="user.email" @input="verifyEmail"  placeholder="exemple@exemple.fr">
                        <i class="fas fa-check check" v-if="checkTwo == true"></i>
                        <i class="fas fa-times error" v-if="checkTwo == false"></i>
                        <span v-if="checkTwo == false">L'adresse email n'a pas le bon format</span>
                    </div>

                    <div class="form-container">
                        <label for="password">Mot de passe :</label>
                        <input type="password" id="password" v-model="user.password" @input="verifyPassword"  placeholder="******">
                        <i class="fas fa-check check" v-if="checkThree == true"></i>
                        <i class="fas fa-times error" v-if="checkThree == false"></i>
                        <span v-if="checkThree == false">Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial ( * . $ ? ! ^ % )</span>
                    </div>

                    <div class="form-container">
                        <label for="confirm-password">Confirmer le mot de passe :</label>
                        <input type="password" id="confirm-password" v-model="user.confirmPassword" @input="verifyConfirmPassword" placeholder="******">
                        <i class="fas fa-check check" v-if="checkFour == true"></i>
                        <i class="fas fa-times error" v-if="checkFour == false"></i>
                        <span v-if="checkFour == false">Les deux mots de passe sont différents</span>
                    </div>

                    <button @click.prevent="subscribe">
                        <span v-if="status == 'loading'">Inscription en cours...</span>
                        <span v-else>Inscription</span>
                    </button>
                
                    <div :class="{'button--disabled' : !formVerify()}"></div>                    
                </form>

                <img src="../assets/phone.png" alt="">
            </section>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Subscribe',
        
        data(){
            return{
                user: {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                checkOne: null,
                checkTwo: null,
                checkThree: null,
                checkFour: null,
                errorMsg: ""
            }
        },

        computed: {
            ...mapState(['status'])
        }, 

        methods: {
            verifyUsername : function(event){
                if(event.target.value.length >= 3 && event.target.value.length <= 50){
                    this.checkOne = true;  
                }         
                else {
                    this.checkOne = false;
                } 
            },

            verifyEmail: function(event){
                const regexEmail = /\S+@\S+\.\S+/;

                if(event.target.value.search(regexEmail) === 0){
                    this.checkTwo = true;

                } else if(event.target.value.search(regexEmail) === -1){
                    this.checkTwo = false;
                }
            },

            verifyPassword: function(event){   
                const specialCaracter = /[^a-zA-Z0-9]/;
                const alphabet = /[a-z]/i;
                const numbers = /[0-9]/;

                let objectValidation = {
                    symbol : 0,
                    letter : 0,
                    number : 0,
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
                    this.checkThree = false; 

                } else {
                    this.checkThree = true;
                }
            },

            verifyConfirmPassword: function(event){
                if(event.target.value.length === 0){
                    this.checkFour = false;
                
                } else if(event.target.value === this.inputValues){
                    this.checkFour = true;

                } else {
                    this.checkFour = false;
                }
            },

            formVerify: function(){
                if(this.checkOne == true && this.checkTwo == true && this.checkThree == true && this.checkFour == true ){
                    return true;
                } else {
                    return false;
                }
            },
            
            subscribe: function(){
                this.$store.dispatch('subscribe', {
                    username: `${this.user.username}`,
                    email :`${this.user.email}`,
                    password: `${this.user.password}`,
                })
                .then(() => {
                    this.$store.dispatch('connexion', {
                        email: this.user.email,
                        password: this.user.password
                    })
                        .then(() => {
                            this.$router.push('/home')
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }, error => {
                        this.errorMsg = error.response.data.error;
                    })
                }
            }
        }
</script>

<style lang='scss' scoped>
        header {
            margin-bottom: 4em;

            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 1em;

                img {
                    width: 20em;

                    @include laptopL {
                        width: 25em;
                    }                    

                    @include mobile-tablet {
                        min-width: 10em;
                    }
                }

                h1 {
                    font-size: 18px;
                    font-weight: 100; 

                    @include laptopL {
                        font-size: 22px;
                    }                      

                    @include mobile-tablet {
                        font-size: 15px;
                        margin-left: 1em;
                    }
                }

                a {
                    text-decoration: none;
                    color: $color-text;
                    font-size: 18px;

                    &:hover {
                        color: $color-anchor-hover;
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
        margin-bottom: 8em;
        height: 70vh;

        img {
            width: 14em;

            @include laptopL {
                width: 17em;
            }

            @include mobile-tablet {
                display: none;
            }
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

            @include mobile-tablet {
                font-size: 13px;
            }
            
            .form-container {
                display: flex;
                flex-direction: column;
                color: $color-text;
                margin: 0.5em 1em;
                max-width: 14em;
                position: relative;

                @include laptopL {
                    font-size: 21px;
                }               

                input {
                    margin: 0.3em 0;
                    width: 17em;

                    @include laptopL {
                        min-width: 22em;
                    }

                    @include mobile-tablet {
                        width: 14em;
                    }
                }

                .check {
                    color: green;
                    position: absolute;
                    top: 1.8em;
                    right: -2em;

                    @include mobile-tablet {
                        top: 2em;
                        right: -2.4em;
                    }
                }

                .error {
                    color: red;
                    position: absolute;
                    top: 1.9em;
                    right: -1.8em;

                    @include mobile-tablet {
                        top: 2.2em;
                        right: -2.2em;
                    }
                }

                span {
                    font-size: 12px;
                    flex-wrap: wrap;
                    font-style: italic;
                }
            }

            button {
                margin-top: 1em;
                padding: 0.5em;
                color: $color-text;
                background-color: #3f4f83;
                border: none;
                border-radius: 0.5em;
                cursor: pointer;
                font-size: 15px;

                &:hover {
                    transform: scale(1.1);
                    transition: 0.3s;
                }
            }

            .button--disabled {
                width: 87px;
                height: 32px;
                background-color: rgba($color: #f1f1f1, $alpha: 0.7);
                border-radius: 0.5em;
                position: absolute;
                bottom: 2em;
            }

            .msg-error {
                color: red;
                font-size: 13px;
                font-style: italic;
            }
        }
    }
</style>