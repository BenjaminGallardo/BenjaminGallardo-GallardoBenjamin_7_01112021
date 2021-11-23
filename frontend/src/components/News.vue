<template>
    <section>
        <ul>
            <li :key="index" v-for="(publication, index) in publications">
                <article class="news">
                    <div class="header-news">                      
                        <router-link :to='`/member/${publication.userId}`'><i class="fas fa-user"></i> Gallardo Benjamin</router-link>
                        
                        <div class="date">
                            <p>{{ publication.date }}</p>
                            <i class="fas fa-ellipsis-h fa-2x" @click="toggleMenu(publication.id)"></i>
                        </div>

                        <div class="btn-action" v-if="reveleMenu == publication.id">
                            <div class="triangle"></div>
                            <router-link :to="`/publication/${this.reveleMenu}`" class="btn-modify">Modifier</router-link>
                            <button class="btn-delete" @click="toggleModale">Supprimer</button>
                        </div>
                    </div>

                    <hr>

                    <div class='body-news'>
                        <p>{{ publication.textField }}</p>
                        <img v-if="publication.imageUrl != undefined" :src="publication.imageUrl" alt="Images de la publication">
                    </div>  

                    <hr>

                    <div class="footer-news">
                        <create-comment :publicationId="publication.id" :userInformations="userInformations"></create-comment>
                        <view-comments :publicationId="publication.id"></view-comments>
                    </div> 
                </article>
            </li>    
        </ul>
        
        <div class="bloc-modale" v-if="revelePopUp == true">
            <div class="overlay" @click="toggleModale"></div>

            <aside class="pop-up">
                <button class="btn-quit" @click="toggleModale">X</button>

                <p>Voulez-vous vraiment supprimer la publication ?</p>

                <div>                
                    <button class="btn-yes" @click="deletePublication">Oui</button> 
                    <button class="btn-no" @click="toggleModale">Non</button>
                </div>
            </aside>
        </div>    
    </section>
</template>

<script>
    import axios from 'axios'
    import CreateComment from './CreateComment.vue'
    import ViewComments from './ViewComments.vue'

    export default {
        name: 'Publication',
        components: {
            CreateComment,
            ViewComments
        },
        data(){
            return {
                reveleMenu: -1,
                publications: [],
                revelePopUp: false,
            }
        },
        props: ["userInformations"],
        methods: {
            toggleMenu: function(id){
                if(id == this.reveleMenu){
                   this.reveleMenu = -1; 
                } else {
                    this.reveleMenu = id;
                }  
            },

             toggleModale(){
                this.revelePopUp = !this.revelePopUp;
            },

            deletePublication(){
                axios
                .delete('http://localhost:3001/api/publication', {
                    data : {id : this.reveleMenu}
                }, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch()
            },
        },
        created(){
            axios
            .get('http://localhost:3001/api/publication', {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
            .then(response => {
                for(const publication of response.data){
                    this.publications.push(publication)
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style lang='scss' scoped>

    ul {
        list-style-type: none;
        padding-inline-start: 0px;
    }

    .news {
        background-color: white;
        margin: 2em;
        padding: 1em;
        border-radius: 0.5em;

        .header-news {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;

                a {
                    color: black;
                    text-decoration: none;

                @include mobile-tablet {
                        font-size: 14px;
                    }
                }

                i {
                    cursor: pointer;
                }

                .date {
                    display: flex;
                    align-items: center;

                    p {
                        margin: 0 1em;
                        font-size: 12px;

                        @include mobile-tablet {
                            font-size: 10px;
                            position: absolute;
                            width: 150px;
                            left: -1em;
                            bottom: -0.8em;
                        }
                    }
                }
                .btn-action {
                    position: absolute;
                    right: 0;
                    top: 2em;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    border-radius: 0.5em;

                    .triangle {
                        height : 0;
                        width : 0;
                        border-right : 10px solid transparent;
                        border-bottom : 10px solid #385565;
                        border-left : 10px solid transparent;
                        position: absolute;
                        top: -0.5em;
                        right: 0.4em;
                    }

                    button {
                        width: 100%;
                        color: white;
                        border: none;
                        border-radius: 0;
                        padding: 0.5em;
                        cursor: pointer;
                        background-color: #385565; 

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .btn-modify {
                        text-align: center;
                        border-radius: 0.5em 0.5em 0 0;
                        border-bottom: solid 1px white;
                        background-color: #385565;
                        font-size: 12px;
                        color: white;
                        padding: 0.5em;
                        width: 83.5%;

                        &:hover {
                            text-decoration: underline;
                        }
                    }

                    .btn-delete {
                        border-radius: 0em 0em 0.5em 0.5em;
                    }
                }
            }

        .body-news {

            img {
                width: 100%;
            }

            @include mobile-tablet {
                font-size: 14px;
            }
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
</style>

