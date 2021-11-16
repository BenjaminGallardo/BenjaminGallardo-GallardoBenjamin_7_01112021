<template>
    <div>
        <header>
            <header-nav></header-nav>
        </header>
        <main>
            <section class="general-profile">
                <h1>Votre profil</h1>
                
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
            </section>

            <section>
                <modify-email></modify-email>
                <modify-password></modify-password>
            </section>
        </main>
    </div>
</template>

<script>
    import HeaderNav from "../components/HeaderNav.vue"
    import ModifyEmail from "../components/ModifyEmail.vue"
    import ModifyPassword from "../components/ModifyPassword.vue"

    export default {
        name: 'Profile',
        components: {
            HeaderNav,
            ModifyEmail,
            ModifyPassword
        },
        mounted(){
            // if(this.$store.state.user.userId == -1) {
            //     this.$router.push('/connexion');
            //     return;
            // }
            // this.$store.dispatch('getUserInfosProfile');
        }
    }
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80vh;

        h1{
            display: none;
        }
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
                color: $color-text;
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
            color: $color-text;
            font-size: 20px;
        }

        #bio {
            position: relative;

            button {
                position: absolute;
                right: 1em;
                bottom: 1em;
                background-color: #05d157;
                color: $color-text;
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
            color: $color-text;
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