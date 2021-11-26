<template>
    <article>
        <router-link to='/profile'><img :src="userInformations.imageUrl" alt=""> {{ userInformations.username }}</router-link>

        <form> 
            <p class="msg-error" v-if="msgError != ''">{{ msgError }}</p>
            <textarea name="commentText" id="textarea-comment-text" cols="30" rows="3" placeholder="Commenter cette publication..." v-model="commentText" aria-label="Crééer un commentaire"></textarea>
            <button type="submit" @click.prevent="sendComment" aria-label="Boutton d'envoi de commentaire"><i class="fas fa-paper-plane"></i></button>
        </form>
    </article>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CreateComment',

        data(){
            return {
                commentText: '',
                publication_id: this.publicationId,
                msgError: '',
            }
        },

        props:['publicationId', 'userInformations'],

        methods:{
            sendComment(){
                axios
                .post("http://localhost:3001/api/comment", {
                    userId: this.$store.state.user.userId,
                    commentText : this.commentText,
                    publication_id : this.publication_id
                }, {headers:{ 'Authorization' : `Bearer ${this.$store.state.user.token}`}})
                .then(()=> {
                    setTimeout(function(){ 
                    window.location.href="http://localhost:8080/home"
                    }, 1000)
                })
                .catch(error => {
                   this.msgError = error.response.data.error;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    article {
        margin: 0;
        padding: 0;

        a {
            color: black;
            text-decoration: none;
            display: flex;
            align-items: center;
            margin-bottom: 0.5em;

            @include mobile-tablet {
                font-size: 13px;
            }

            img {
                width: 2.5em;
                height: 2.5em;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 0.5em;
            }
        }

        form {
            position: relative;

            .msg-error {
                font-size: 12px;
                color: red;
                font-style: italic;
            }

            textarea {
                width:100%;
                resize: none;
                background-color: #dfdede;
            }

            button {
                position: absolute;
                bottom: 0.6em;
                right: -0.4em;
                background-color: transparent;
                border: none;
                font-size: 15px;
                cursor: pointer;

                &:hover {
                    color: rgba(56, 85, 101, 0.5);
                    transform: scale(1.05);
                    transition: 0.5s;
                }
            }
        }
    }
</style>