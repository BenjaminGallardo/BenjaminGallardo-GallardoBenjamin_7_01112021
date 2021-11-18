<template>
    <div id="connexion">
        <header>
            <nav>
                <img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania">
                <router-link to="Subscribe"><h1>Inscription</h1></router-link>
            </nav>
        </header>
        <main>
            <section>
                <form>
                    <p class="msg-error" v-if="status == 'error-connexion'">{{ errorMsg }}</p>
                    <div class="form-container">
                        <label for="username">Adresse Email :</label>
                        <input type="text" name="username" id="username" v-model="user.email">
                    </div>

                    <div class="form-container">
                        <label for="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" v-model="user.password">
                    </div>

                    <button @click.prevent="connexion">
                        <span v-if="status == 'loading'">Connexion en cours</span>
                        <span v-else>Connexion</span>
                    </button>
                    <div class="button--disabled" v-if="user.email == '' || user.password == '' " ></div>
                </form>
                
                <img src="../assets/phone.png" alt="">
            </section>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Connexion',
        data(){
            return {
                user: {
                    email: '',
                    password: ''
                },
                errorMsg: ""
            }
        },

        computed: {
            ...mapState(['status'])
        },  

        methods: {
            connexion: function(){
                this.$store.dispatch('connexion', {
                    email :`${this.user.email}`,
                    password: `${this.user.password}`
                })
                .then(() => {
                    this.$router.push('/profile')
                }, error => {
                    this.errorMsg = error.response.data.error
                })
            }
        },
        
        mounted(){
            if(this.$store.state.user.userId != -1){
                this.$router.push('/profile');
                return;
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

                @include laptopL {
                    width: 25em;
                }

                @include mobile-tablet {
                    width: 10em;
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
        height: 90vh;

        img {
            width: 12em;

            @include laptopL {
                width: 16em;
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

            @include laptopL {
                font-size: 21px;
            }

            @include mobile-tablet {
                font-size: 14px;
            }
            
            .form-container {
                display: flex;
                flex-direction: column;
                color: $color-text;
                margin: 0.5em 1em;
                max-width: 14em;
                position: relative;

                input {
                    margin: 0.5em 0;
                    min-width: 17em;

                    @include laptopL {
                        min-width: 22em;
                    }

                    @include mobile-tablet {
                        min-width: 12em;
                    }
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