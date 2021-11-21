<template>
    <article>
        <router-link to='/profile'><i class="fas fa-user"></i> Gallardo Benjamin</router-link>
        <form> 
            <p class="msg-error" v-if="msgError != ''">{{ msgError }}</p>
            <label for="comment-text"></label>
            <textarea name="commentText" id="comment-text" cols="30" rows="3" placeholder="Commenter cette publication..." v-model="commentText"></textarea>
            <button type="submit" @click.prevent="sendComment"><i class="fas fa-paper-plane"></i></button>
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
        props:['publicationId'],
        methods:{
            sendComment(){
                axios
                .post("http://localhost:3001/api/comment", {
                    userId: 67,
                    commentText : this.commentText,
                    publication_id : this.publication_id
                })
                .then(response => {
                    console.log(response);
                    
                    setTimeout(function(){ 
                    window.location.href="http://localhost:8080/home"
                    }, 1000)
                    return;
                })
                .catch(error => {
                   this.msgError = error.response.data.error;
                   console.log(this.msgError);
                })
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

            @include mobile-tablet {
                font-size: 13px;
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