<template>
    <div>
        <header>
            <header-nav></header-nav>
        </header>
        <main>
            <section class="general-profile">
                <h1>Votre profil</h1>
                
                <div class="modify-img-profile">
                    <div class="container-profile-img">
                        <img class="img-profile" src="../assets/img_profile.jpg" alt="">  
                    </div>

                    <form action="">
                        <label for="input-modify-image-profile" class="label-modify-image-profile">Modifier</label>
                        <input type="file" id="input-modify-image-profile">
                    </form>
                </div>

                <p>Gallardo Benjamin</p>

                <form id="bio">
                    <textarea name="text-bio" id="text-bio" cols="40" rows="5" value="Etudiant en développement web"></textarea>
                    <button>Modifier</button>
                </form>

                <button class="delete" @click="toggleModale">Supprimer le compte</button>

                <div class="bloc-modale" v-if="revelePopUp == true">
                    <div class="overlay" @click="toggleModale"></div>

                    <aside class="pop-up">
                        <button class="btn-quit" @click="toggleModale">X</button>

                        <p>Voulez-vous vraiment supprimer votre compte ?</p>
                        <div>                
                            <button class="btn-yes" @click="deleteAccount">Oui</button> 
                            <button class="btn-no" @click="toggleModale">Non</button>
                        </div>
                    </aside>
                </div>

            </section>

            <section>
                <modify-email></modify-email>
                <modify-password></modify-password>
            </section>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'
    import HeaderNav from "../components/HeaderNav.vue"
    import ModifyEmail from "../components/ModifyEmail.vue"
    import ModifyPassword from "../components/ModifyPassword.vue"

    export default {
        name: 'Profile',
        data(){
            return {
                revelePopUp: false
            }
        },

        components: {
            HeaderNav,
            ModifyEmail,
            ModifyPassword
        },

        methods: {
            toggleModale(){
                this.revelePopUp = !this.revelePopUp;
            },

            deconnexion(){
                this.$store.commit('deconnexion');
                this.$router.push('/account-delete');
            },

            deleteAccount(){
                axios
                .delete('http://localhost:3001/api/profile', {
                    data: {id:70}
                })
                .then(() => {
                    this.deconnexion();
                })
            }
        }
        // mounted(){
        //      if(this.$store.state.user.userId == -1) {
        //         this.$router.push('/connexion');
        //         return;
        //     }
        // }
    }
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        justify-content: space-around;
        align-items: center;
        min-height: 90vh;

        @include mobile-tablet {
            flex-direction: column;
        }

        h1{
            display: none;
        }
    }

    .general-profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .modify-img-profile {
            position: relative;

            .container-profile-img {
                height: 14em;
                width: 14em;
                border-radius: 50%;
                overflow: hidden;

                @include laptopL {
                    height: 20em;
                    width: 20em;
                }

                @include mobile-tablet {
                    margin-top: 1em;
                }

                .img-profile {
                    width: 15em;

                    @include laptopL {
                        height: 20em;
                        width: 20em;
                    }
                }
            }

            .label-modify-image-profile {
                position: absolute;
                right: 0em;
                top: 1em;
                @include btn-modify;

                @include laptopL {
                    right: 2em;
                }
            }

            #input-modify-image-profile {
                display: none;
            }
        }

        p {
            color: $color-text;
            font-size: 20px;

            @include laptopL {
                font-size: 25px;
            }
        }

        #bio {
            position: relative;

                textarea {
                    resize: none;

                    @include laptopL {
                        height: 150px;
                        width: 400px;
                        
                    }
                }
           

            button {
                position: absolute;
                right: 0.5em;
                bottom: 1em;
                @include btn-modify;
            }
        }

        .delete {
            background-color:red;
            color: $color-text;
            border: none;
            border-radius: 0.2em;
            padding: 0.5em 1em;
            margin-top: 1em;
            cursor: pointer;

                @include laptopL {
                    font-size: 18px;
                }

            &:hover {
                transform: scale(1.1);
                transition: 0.8s;
            }
        }

        .bloc-modale {
            @include bloc-center;
            z-index: 2;

            .overlay {
                @include overlay;
            }

            .pop-up {
                position:fixed;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: white;
                border-radius: 0.5em;
                padding: 1em 1em 2em 1em;

                @include mobile-tablet {
                    text-align: center;
                    font-size: 14px;
                    margin: 0 1em;
                }

                .btn-quit {
                    position: absolute;
                    font-size: 13px;
                    right: 0.5em;
                    top: 0.5em;
                    background-color: red;
                    border: none;
                    padding: 0.2em 0.5em;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.1);
                        transition: 0.5s;
                    }
                }

                p {
                    color: black;
                }

                .btn-yes {
                    color: white;
                    margin-right: 2em;
                    padding: 1em 2em;
                    border: none;
                    border-radius: 0.5em;
                    background-color: red;
                    cursor: pointer;
                    font-weight: bold;

                        &:hover {
                            transform: scale(1.1);
                            transition: 0.5s;
                        }
                }

                .btn-no {
                    padding: 1em 2em;
                    border: none;
                    border-radius: 0.5em;
                    background-color: #05d157;
                    cursor: pointer;
                    font-weight: bold;

                        &:hover {
                            transform: scale(1.1);
                            transition: 0.5s;
                        }
                }
            }
        }
    }
</style>