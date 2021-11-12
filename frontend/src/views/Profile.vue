<template>
    <div>
        <Nav />

        <main>
            <article class="general-profile">
                
                <div class="modify-img-profile">
                    <div class="container-profile-img">
                        <img class="img-profile" src="../assets/img_profile.jpg" alt="">  
                    </div>

                    <form action="">
                        <label for="input-modify-image-profile" class="label-modify-image-profile">Modifier</label>
                        <input type="file" id="input-modify-image-profile">
                    </form>
                </div>


                <p>Gallardo Benjamin</p>

                <form id="bio">
                    <textarea name="text-bio" id="text-bio" cols="40" rows="5" value="Etudiant en développement web"></textarea>
                    <button>Modifier</button>
                </form>

                <button class="delete">Supprimer le compte</button>
            </article>

            <article>
                <ModifyEmail/>
                <ModifyPassword />
            </article>
        </main>
    </div>
</template>

<script>
    import Nav from "../components/Nav.vue"
    import ModifyEmail from "../components/ModifyEmail.vue"
    import ModifyPassword from "../components/ModifyPassword.vue"

    export default {
        name: 'Profile',
        components: {
            Nav,
            ModifyEmail,
            ModifyPassword
        }
    }
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80vh;
    }

    .general-profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .modify-img-profile {
            position: relative;

            .container-profile-img {
                height: 14em;
                width: 14em;
                border-radius: 50%;
                overflow: hidden;

                .img-profile {
                    width: 15em;
                }
            }

            .label-modify-image-profile {
                position: absolute;
                right: 1em;
                top: 1em;
                background-color: #05d157;
                color: white;
                border: none;
                border-radius: 0.2em;
                padding: 0.3em 0.5em;
                cursor: pointer;
                font-size: 13px;

                &:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                }
            }

            #input-modify-image-profile {
                display: none;
            }
        }

        p {
            color: white;
            font-size: 20px;
        }

        #bio {
            position: relative;

            button {
                position: absolute;
                right: 1em;
                bottom: 1em;
                background-color: #05d157;
                color: white;
                border: none;
                border-radius: 0.2em;
                padding: 0.3em 0.5em;
                cursor: pointer;

                &:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                }
            }
        }

        .delete {
            background-color:red;
            color: white;
            border: none;
            border-radius: 0.2em;
            padding: 0.5em 1em;
            margin-top: 1em;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
                transition: 0.8s;
            }
        }
    }
</style>