<template>
    <div>
        <Nav />

        <main>
            <article class="general-profile">
                
                <div class="modify-img-profile">
                    <div class="container-profile-img">
                        <img class="img-profile" src="../assets/img_profile.jpg" alt="">  
                    </div>

                    <button>Modifier</button>
                </div>


                <p>Gallardo Benjamin</p>

                <div id="bio">
                    <textarea name="text-bio" id="text-bio" cols="40" rows="5"></textarea>
                    <button>Modifier</button>
                </div>

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

            button {
                position: absolute;
                right: 1em;
                top: 1em;
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