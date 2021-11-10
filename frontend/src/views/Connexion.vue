<template>
    <div id="connexion">
        <header>
            <nav>
                <img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania">
                <router-link to="Subscribe">Inscription</router-link>
            </nav>
        </header>
        <main>
            <section>
                <form>
                    <div class="form-container">
                        <label for="username">Adresse Email :</label>
                        <input type="text" name="username" id="username" v-model="user.email">
                    </div>

                    <div class="form-container">
                        <label for="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" v-model="user.password">
                    </div>

                    <button @click="connexion">Connexion</button>
                </form>
                
                <img src="../assets/phone.png" alt="">
            </section>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Connexion',
        data(){
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            connexion: function(){
                axios
                .post('http://localhost:3001/api/auth/connexion', {
                    email :`${this.user.email}`,
                    password: `${this.user.password}`
                })
                .then(() => {
    
                });
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

            a {
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
        height: 80vh;

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
            
            .form-container {
                display: flex;
                flex-direction: column;
                color: white;
                margin: 0.5em 1em;
                max-width: 14em;
                position: relative;

                input {
                    margin: 0.5em 0;
                    min-width: 17em;
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

                &:hover {
                    transform: scale(1.1);
                    transition: 0.3s;
                }
            }
        }
    }
</style>