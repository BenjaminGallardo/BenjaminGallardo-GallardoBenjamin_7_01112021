<template>
    <div class="comments">

        <button class="view-comments" @click="toggleViewComments">
            <span v-if="reveleComments == true">Fermer les commentaires</span>
            <span v-else>Voir les commentaires</span>
        </button>

        <ul v-if="reveleComments == true">
            <li :key="index" v-for="(comment, index) in allComments">
                <article class="comment" v-if="comment.publication_id === publicationId">
                    <div class="name-date">
                        <p><i class="fas fa-user"></i>Gallardo Benjamin</p>
                        <p>{{ comment.date }}</p>
                    </div>
                    <p class="contain-comment">{{ comment.commentText }}</p>
                    <button class="delete-comment" @click="deleteComment()"><i class="fas fa-trash-alt"></i></button>
                </article>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ViewComments',
        data(){
            return {
                reveleComments: false,
                allComments: [],
                commentId: ""
            }
        },
        props:['publicationId'],
        methods:{
            toggleViewComments(){
                this.reveleComments = !this.reveleComments;

                if(this.reveleComments == true && this.allComments == ''){
                    axios
                    .get('http://localhost:3001/api/comment')
                    .then(response => {
                        for(const comment of response.data){
                         this.allComments.push(comment);
                        }
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .view-comments {
        background-color: transparent;
        border: none;
        padding: 0;
        font-style: italic;
        font-weight: 700;
        color: #6b6a6a;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
            transition: 0.5s;
        }

    }

    ul {
        list-style-type: none;

        @include mobile-tablet {
            padding: 0;
        }

        .comment {
            margin: 1em 0 0 0;
            position: relative;

            .name-date {
                display: flex;
                justify-content: space-between;
                align-items: center;

                    @include mobile-tablet {
                        flex-direction: column;
                        align-items: start;
                    }

                p {
                    font-size: 14px;
                    margin: 0 0 0.3em 0;

                    @include mobile-tablet {
                        font-size: 13px;
                    }

                i {
                    margin-right: 0.3em;
                    }
                }

                p:last-child{
                    font-size: 12px;

                    @include mobile-tablet {
                        font-size: 10px;
                    }
                }
            }

            .contain-comment {
                background-color: rgba(56, 85, 101, 0.5);
                border-radius: 0.5em;
                padding: 0.5em 1.5em 0.5em 0.5em;
                font-size: 13px;
                margin: 0;
            }

            .delete-comment {
                border: none;
                background-color: transparent;
                padding: 0;
                position: absolute;
                right: 0.5em;
                bottom: 0.3em;
                cursor: pointer;

                &:hover {
                    color: rgb(253, 76, 76);
                    transform: scale(1.1);
                    transition: 0.5s;
                }
            }
        }
    }
</style>