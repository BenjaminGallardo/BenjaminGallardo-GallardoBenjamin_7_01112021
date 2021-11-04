<template>
    <div>
        <Nav />

        <div id="container">
            <section>
                
                <div class="azerty">
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
            </section>

            <div>
                <ModifyEmail/>
                <ModifyPassword />
            </div>
        </div>
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
    #container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80vh;
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .azerty {
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
                    padding: 0.3em;
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
                padding: 0.3em;
            }
        }

        .delete {
            background-color:red;
            color: white;
            border: none;
            border-radius: 0.2em;
            padding: 0.5em;
            margin-top: 1em;
        }
    }
</style>