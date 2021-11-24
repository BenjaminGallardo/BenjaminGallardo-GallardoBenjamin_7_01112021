<template>
    <div class="bloc-modale">
        <div class="overlay"></div>

        <section class="modify-publication">

            <router-link to="/home" class="btn-quit">X</router-link>

            <h1>Modifier la publication</h1>
            
            <hr>

            <article class="form-container">
                <form id="form-publication">
                    <label class="label-modify-publication" for="input-modify-publication"><img class="img-user" :src="userInfos.imageUrl" alt="Image de profil vignette"> {{ userInfos.username }}</label>
                    <textarea id="input-modify-publication" cols="30" rows="10" name="textField" :value="publicationContain.textField" ></textarea>
                    <input class="input-user" type="text" name="userId" :value="this.$store.state.user.userId" aria-label="Numero utilisateur">
                            
                    <img v-if="publicationContain.imageUrlPublication != undefined" class="old-image" :src="publicationContain.imageUrlPublication" alt="">

                    <label for="my-file" class="label-add-img" >Modifier l'image</label>
                    <input id="my-file" class="input-add-img" type="file" accept="image/png, image/jpeg" name="imageUrl">
                </form>

                <div class="container-btn-publication">
                    <button form="form-publication" type="submit" class="btn-publication" @click.prevent="sendModificationPublication">Publier la modification</button>
                </div>
            </article>
                    
        </section>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ModificationPublication',
        data(){
            return {
                id: this.$route.params.id,
                publicationContain: [],
                imageUrl: [],
                userInfos: ''
            }
        },
        methods: {
            sendModificationPublication(){
                 let sendFormModificationPublication = new FormData(document.getElementById("form-publication"));

                 axios
                 .put(`http://localhost:3001/api/publication/${this.id}`, sendFormModificationPublication , {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
                 .then(() => {
                    this.$forceUpdate();
                    setTimeout(function(){ 
                    window.location.href="http://localhost:8080/home"
                    }, 1000)
                    return;
                 })

            }
        },
        created(){
            axios
            .get(`http://localhost:3001/api/publication/${this.id}`, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
            .then(response => {
                this.publicationContain = response.data[0];
            })
        },
        mounted(){
            if(this.$store.state.user.userId == -1){
                this.$router.push('/connexion')
            }

            axios
            .post('http://localhost:3001/api/profile', {id:this.$store.state.user.userId}, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
            .then(response => {
                this.userInfos = response.data;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .bloc-modale {
        @include bloc-center;
        
        .overlay {
            @include overlay;
        }

        .modify-publication {
            position:fixed;
            position: relative;
            background-color: white;
            border-radius: 0.5em;
            padding: 0em 1em;
            width: 600px;

            @include mobile-tablet {
                width: 80%;
                margin: 1em 0;
            }

            .btn-quit {
                position: absolute;
                right: 1em;
                top: 1em;
                background-color: red;
                color: $color-text;
                border: none;
                border-radius: 0.5em;
                padding: 0.2em 0.5em;
                cursor: pointer;
                text-decoration: none;
                font-size: 13px;

                @include mobile-tablet {
                    right: 0.2em;
                    top: 0.2em;
                }

                &:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                }
            }

            h1 {
                text-align: center;

                @include mobile-tablet {
                    font-size: 18px;
                    line-height: 0.5em;
                    margin-top: 1.5em;
                }
            }

            form {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                position: relative;

                @include mobile-tablet {
                    label {
                        font-size: 15px;
                    }
                }

                .label-modify-publication {
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.5em;

                    .img-user {
                        width: 2.5em;
                        height: 2.5em;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-right: 0.5em;
                    }
                }

                textarea {
                    width: 100%;
                    background-color: rgb(223, 222, 222);
                    resize: none;

                    @include mobile-tablet {
                        height: 100px;
                    }
                }

                .input-user {
                    display: none;
                }

                .old-image {
                    margin-top: 1em;
                    width: 200px;
                    height: 130px;

                    @include mobile-tablet {
                        height: 100px;
                    }
                }
             
                .label-add-img {
                    margin: 1em 0;
                    padding: 0.5em;
                    background-color: #365665;
                    border-radius: 0.5em;
                    cursor: pointer;
                    color: $color-text;
                    font-size: 13px;
                    z-index: 1;

                    &:hover {
                        transform: scale(1.05);
                        transition: 0.5s;
                    }
                }

                .input-add-img {
                    position: absolute;
                    bottom: 1.35em;
                    left: 0;
                }
            }

            .container-btn-publication {
                display: flex;
                align-items: center;
                justify-content: center;

                .btn-publication {
                    background-color: #05d157;
                    color: $color-text;
                    margin: 1em 0;
                    border: none;
                    border-radius: 0.2em;
                    padding: 0.3em 0.5em;
                    cursor: pointer;
                    width: 50%;

                    &:hover {
                        transform: scale(1.05);
                        transition: 0.5s;
                    }
                }
            }
        }
    }
</style>