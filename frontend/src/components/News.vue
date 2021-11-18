<template>
    <section>
        <ul>
            <li :key="index" v-for="(publication, index) in publications">
                <article>
                    <div class="header-news">
                        <router-link to='/home'><i class="fas fa-user"></i> Gallardo Benjamin</router-link>

                        <i class="fas fa-ellipsis-h fa-2x" @click="toggleMenu(publication.id)"></i>

                        <div class="btn-action" v-if="reveleMenu == publication.id">
                            <div class="triangle"></div>
                            <router-link :to="`/publication/${this.reveleMenu}`" class="btn-modify">Modifier</router-link>
                            <button class="btn-delete" @click="deletePublication">Supprimer</button>
                        </div>
                    </div>

                    <hr>

                    <div class='body-news'>
                        <p>{{ publication.textField }}</p>
                        <img :src="publication.imageUrl" alt="Images de la publication">
                    </div>  

                    <hr>

                    <div class="footer-news">
                        <router-link to='/home'><i class="fas fa-user"></i> Guilaume Collin</router-link>
                        <textarea placeholder="Ajouter un commentaire"></textarea>
                    </div> 
                </article>
            </li>    
        </ul>    
    </section>
</template>

<script>
import axios from 'axios'

export default {
        name: 'Publication',
        data(){
            return {
                reveleMenu: -1,
                publications: []
            }
        },
        methods: {
            toggleMenu: function(id){
                this.reveleMenu = id;
            },

            deletePublication(){
                axios
                .delete('http://localhost:3001/api/publication', {
                    data : {id : this.reveleMenu}
                })
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch()
            },
        },
        created(){
            axios
            .get('http://localhost:3001/api/publication')
            .then(response => {
                for(const publication of response.data){
                    this.publications.push(publication)
                }
            });
        }
    }
</script>

<style lang='scss' scoped>

    ul {
        list-style-type: none;
        padding-inline-start: 0px;
    }

    article {
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

        .footer-news {
            display: flex;
            flex-direction: column;

            a {
                color: black;
                text-decoration: none;
                margin: 1em 0 0.5em 0;

                @include mobile-tablet {
                    font-size: 14px;
                }
            }
        }
    }
</style>

