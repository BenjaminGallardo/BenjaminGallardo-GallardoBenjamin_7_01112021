<template>
    <div> 
        <nav>
            <img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania">
            <ul>
                <li><router-link to="/home" title="Accueil"><i class="fas fa-home fa-2x"></i></router-link></li>
                <li><router-link to="/profile" title="Profil"><i class="fas fa-user fa-2x"></i></router-link></li>
                <li><a href="" @click="deconnexion"><i class="fas fa-sign-out-alt fa-2x"></i></a></li>
            </ul>
        </nav>

        <hr>
    </div>
</template>

<script>
    export default {
       name: 'HeaderNav',
       methods: {
           deconnexion(){
               this.$store.commit('deconnexion');
               this.$router.push('/connexion');
           }
       }
    }
</script>

<style lang="scss" scoped>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5em 1em;

        @include mobile-tablet {
            flex-direction: column;
        }

        img {
            width: 15em;
        }

        ul {
            display: flex;
            align-items: center;
            list-style-type: none;
            padding: 0;

            li a {
                color: $color-text;
                margin-left: 3em;

                @include mobile-tablet {
                    margin: 0em 1em 0em 1em;
                }

                i:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                    color: $color-anchor-hover;
                }
            }
        }
    }
</style>