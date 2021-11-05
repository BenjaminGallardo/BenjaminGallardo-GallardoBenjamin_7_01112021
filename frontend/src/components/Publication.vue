<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale"></div>

        <section class="create-publication">

            <button class="btn-quit" @click="toggleModale">X</button>

            <h1>Créer une publication</h1>
            <hr>

            <article class="form-container">
                <form id="form-publication">
                    <label for="input-comments"><i class="fas fa-user"></i> Guillaume Collin</label>
                    <textarea id="input-comments" cols="30" rows="10" placeholder="Créer votre commentaire..."></textarea>
                    <button class="btn-add-img">Ajouter une image</button>
                </form>

                <div class="container-btn-publication">
                    <button form="form-publication" class="btn-publication">Publier</button>
                </div>
            </article>
            
        </section>
    </div>
</template>

<script>
    export default {
        name: "Publication",
        props: ['revele', 'toggleModale']
    }
</script>

<style lang="scss" scoped>
    .bloc-modale {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .overlay {
            background-color: rgba(0,0,0,0.8);
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
        }

        .create-publication {
            position:fixed;
            position: relative;
            background-color: white;
            border-radius: 0.5em;
            padding: 0em 1em;
            width: 600px;

            .btn-quit {
                position: absolute;
                right: 1em;
                top: 1em;
                background-color: red;
                color: white;
                border: none;
                border-radius: 0.5em;
                padding: 0.2em 0.5em;
                cursor: pointer;

                &:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                }
            }

            h1 {
                text-align: center;
            }

            form {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                textarea {
                    width: 100%;
                    background-color: rgb(223, 222, 222);
                }

                .btn-add-img {
                    background-color: #3f4f83;
                    color: white;
                    margin: 1em 0;
                    border: none;
                    border-radius: 0.2em;
                    padding: 0.3em 0.5em;
                    cursor: pointer;

                    &:hover {
                        transform: scale(1.05);
                        transition: 0.5s;
                    }
                }
            }

            .container-btn-publication {
                display: flex;
                align-items: center;
                justify-content: center;

                .btn-publication {
                    background-color: #05d157;
                    color: white;
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

