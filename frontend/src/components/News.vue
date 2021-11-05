<template>
    <article>
        <div class="header-news">
            <router-link to='/home'><i class="fas fa-user"></i> Gallardo Benjamin</router-link>
            <i class="fas fa-ellipsis-h fa-2x"></i>
        </div>

        <hr>

        <div class='body-news'>
            <p>Ceci est la défense de Paris ! Qu'en pensez vous ? 😄</p>
            <img src="../assets/paris.jpg" alt="">
        </div>  

        <div class="footer-news">
            <router-link to='/home'><i class="fas fa-user"></i> Guilaume Collin</router-link>
            <textarea name="" id="" placeholder="Ajouter un commentaire"></textarea>
        </div> 
    </article>
</template>

<script>
    export default {
        name: 'Publication'
    }
</script>

<style lang='scss' scoped>
    article {
        background-color: white;
        margin: 2em;
        padding: 1em;
        border-radius: 0.5em;

        .header-news {
            display: flex;
            align-items: center;
            justify-content: space-between;

                a {
                    color: black;
                    text-decoration: none;
                }

                i {
                    cursor: pointer;
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