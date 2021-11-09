<template>
    <div>
        <ul>
            <li :key="index" v-for="(publication, index) in publications">
                <article>
                    <div class="header-news">
                        <router-link to='/home'><i class="fas fa-user"></i> Gallardo Benjamin</router-link>

                        <i class="fas fa-ellipsis-h fa-2x" @click="toggleMenu"></i>

                        <div class="btn-action" v-if="revele">
                            <div class="triangle"></div>
                            <button class="btn-modify">Modifier</button>
                            <button class="btn-delete">Supprimer</button>
                        </div>
                    </div>

                    <hr>

                    <div class='body-news'>
                        <p>{{publication.textField}} 😄</p>
                        <img src="../assets/paris.jpg" alt="">
                    </div>  

                    <div class="footer-news">
                        <router-link to='/home'><i class="fas fa-user"></i> Guilaume Collin</router-link>
                        <textarea name="" id="" placeholder="Ajouter un commentaire"></textarea>
                    </div> 
                </article>
            </li>

            <li>
                <article>
                    <div class="header-news">
                        <router-link to='/home'><i class="fas fa-user"></i> Gallardo Benjamin</router-link>

                        <i class="fas fa-ellipsis-h fa-2x" @click="toggleMenu"></i>

                        <div class="btn-action" v-if="revele">
                            <div class="triangle"></div>
                            <button class="btn-modify">Modifier</button>
                            <button class="btn-delete">Supprimer</button>
                        </div>
                    </div>

                    <hr>

                    <div class='body-news'>
                        <p>Ceci est la défense de Paris ! Qu'en pensez vous ? 😄 (Je suis la troisième publication mais je ne suis pas sur le serveur)</p>
                        <img src="../assets/paris.jpg" alt="">
                    </div>  

                    <div class="footer-news">
                        <router-link to='/home'><i class="fas fa-user"></i> Guilaume Collin</router-link>
                        <textarea name="" id="" placeholder="Ajouter un commentaire"></textarea>
                    </div> 
                </article>
            </li>
            
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'Publication',
        data(){
            return {
                revele: false,
                publications: []
            }
        },
        methods: {
            toggleMenu: function(){
                this.revele = !this.revele;
            }
        },
        created(){
            axios
            .get('http://localhost:3001/api/publication')
            .then(response => {
                for(const publication of response.data){
                    this.publications.push(publication)
                }
            })
        }
    }
</script>

<style lang='scss' scoped>

    ul {
        list-style-type: none;
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
                        border-radius: 0.5em 0.5em 0 0;
                        border-bottom: solid 1px white;
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
        }

        .footer-news {
            display: flex;
            flex-direction: column;

            a {
                color: black;
                text-decoration: none;
                margin: 1em 0 0.5em 0;
            }
        }
    }
</style>