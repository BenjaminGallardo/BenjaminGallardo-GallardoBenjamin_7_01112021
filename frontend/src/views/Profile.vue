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
                        <img v-if="url == null" class="img-profile" :src="userInformations.imageUrl" alt="Image de profil">
                        <img v-if="url" class="preview-img" :src="url" alt="">
                    </div>

                    <form id="form-modify-img-profile">
                        <label for="input-modify-image-profile" class="label-modify-image-profile">Modifier</label>
                        <input type="file" id="input-modify-image-profile" accept="image/png, image/jpeg" name="imageUrl" @change="onFileChange">
                        <input class="input-user" type="text" name="id" :value="this.$store.state.user.userId">
                        
                        <div class="yes-no" v-if="url != null">
                            <button type="submit" form="form-modify-img-profile" class="btn-check" @click.prevent="sendImage"><i class="fas fa-check"></i></button>
                            <button class="btn-error"><i class="fas fa-times"></i></button>
                        </div>
                    </form>
                </div>

                <p>{{ userInformations.username }}</p>

                <form id="form-bio">
                    <textarea name="bio" id="text-bio" cols="40" rows="5" :value="userInformations.bio"></textarea>
                    <input class="input-user" type="text" name="id" :value="this.$store.state.user.userId">
                    <button type='submit' form="bio" @click.prevent="sendBio">Modifier</button>
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
                <modify-email :userInformations="userInformations"></modify-email>
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
                revelePopUp: false,
                userInformations: '',
                url: null
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

            onFileChange(e){
                const file = e.target.files[0];
                this.url = URL.createObjectURL(file);
            },

            sendImage(){
                let sendFormModificationImage = new FormData(document.getElementById("form-modify-img-profile"));

                axios
                .put('http://localhost:3001/api/profile/profile-image', sendFormModificationImage, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
                .then(() => {
                    setTimeout(function(){ 
                    window.location.href="http://localhost:8080/profile"
                    }, 1000)
                })
                .catch(error => {
                    console.log(error);
                })
            },

            sendBio(){
                let sendFormModificationBio = new FormData(document.getElementById("form-bio"));

                axios
                .put('http://localhost:3001/api/profile/bio', sendFormModificationBio, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
                .then(response => {
                    console.log(response);
                })
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
        },
        mounted(){
            if(this.$store.state.user.userId == -1){
                this.$router.push('/connexion')
            }
            axios
            .post('http://localhost:3001/api/profile', {id:this.$store.state.user.userId}, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
            .then(response => {
                this.userInformations = response.data;
            })
            .catch(error => {
                console.log(error);
            });

            if(this.$store.state.user.userId == -1){
                this.$router.push('/connexion')
            }
        }
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
                overflow: hidden;

                @include mobile-tablet {
                    margin-top: 1em;
                }

                .img-profile {
                    width: 15em;
                    height: 15em;
                    object-fit: cover;
                    border-radius: 50%;

                    @include laptopL {
                        height: 20em;
                        width: 20em;
                    }
                }

                .preview-img {
                    width: 15em;
                    height: 15em;
                    object-fit: cover;
                    border-radius: 50%;

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

                @include mobile-tablet {
                    top: 2em;
                }
            }

            #input-modify-image-profile {
                display: none;
            }

            .input-user {
                display: none;
            }

            .yes-no {
                position: absolute;
                bottom: 2em;
                right: 3.7em;

                @include laptopL {
                    bottom: 3em;
                    right: 6.3em;
                }

                .btn-check {
                    margin-right: 1em;
                    padding: 0.5em 1em;
                    border: none;
                    border-radius: 0.3em;
                    background-color: #05d157;
                    color: white;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.1);
                        transition: 0.5s;
                    }
                }

                .btn-error {
                    margin-right: 1em;
                    padding: 0.5em 1em;
                    border: none;
                    border-radius: 0.3em;
                    color: white;
                    background-color: red;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.1);
                        transition: 0.5s;
                    }
                }

            }
        }

        p {
            color: $color-text;
            font-size: 20px;

            @include laptopL {
                font-size: 25px;
            }
        }

        #form-bio {
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

            .input-user {
                display: none;
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