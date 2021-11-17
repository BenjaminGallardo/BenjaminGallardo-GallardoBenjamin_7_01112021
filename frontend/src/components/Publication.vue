<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale"></div>

        <section class="create-publication">

            <button class="btn-quit" @click="toggleModale">X</button>

            <h2>Créer une publication</h2>
            <hr>

            <article class="form-container">
                <form id="form-publication" action="http://localhost:3001/api/publication" method="POST" enctype="multipart/form-data">
                    <label for="input-comments"><i class="fas fa-user"></i> Benjamin Gallardo</label>
                    <textarea id="input-comments" cols="30" rows="10" placeholder="Créer le message de votre publication..." name="textField"></textarea>
                    
                    <label for="my-file" class="label-add-img" >Ajouter une image</label>
                    <input id="my-file" class="input-add-img" type="file" accept="image/png, image/jpeg" name="imageUrl">
                </form>

                <div class="container-btn-publication">
                    <button form="form-publication" type="submit" class="btn-publication">Publier</button>
                </div>
            </article>
            
        </section>
    </div>
</template>

<script>
    export default {
        name: "Publication",
        data(){
            return {
            }
        },
        props: ['revele', 'toggleModale'],
    }
</script>

<style lang="scss" scoped>
    .bloc-modale {
        @include bloc-center;

        .overlay {
            @include overlay;
        }

        .create-publication {
            position:fixed;
            position: relative;
            background-color: white;
            border-radius: 0.5em;
            padding: 0em 1em;
            width: 600px;

            @include mobile {
                width: auto;
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

                @include mobile {
                    font-size: 12px;
                    top: 0.5em;
                    right: 0.5em;
                }

                &:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                }
            }

            h2 {
                text-align: center;
            }

            form {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                position: relative;

                textarea {
                    width: 100%;
                    background-color: rgb(223, 222, 222);
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

                    @include mobile {
                        font-size: 12px;
                    }

                    &:hover {
                        transform: scale(1.05);
                        transition: 0.5s;
                    }
                }

                .input-add-img {
                    position: absolute;
                    bottom: 1.35em;
                    left: 1.3em;

                    @include mobile {
                        left: 0.5em;
                        bottom: 1.2em;
                    }
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

