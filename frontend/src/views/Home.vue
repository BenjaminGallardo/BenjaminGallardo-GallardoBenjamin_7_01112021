<template>
    <div class="home">
        <nav>
            <img src="../assets/icon-left-font-monochrome-white.png" alt="">
            <ul>
                <li class="home-list"><router-link to="/home" title="Accueil"><i class="fas fa-home fa-2x"></i></router-link></li>
                <li><a @click="toggleModale" title="Créer une publication"><i class="fas fa-plus fa-2x"></i></a></li>
                <li><router-link to="/profile" title="Profil"><i class="fas fa-user fa-2x"></i></router-link></li>
                <li><a @click="deconnexion" title="Déconnexion"> <i class="fas fa-sign-out-alt fa-2x"></i></a></li>
            </ul>
        </nav>

        <hr>

        <main>
            <news></news>
            <hr>
            <members class="listing-members"></members>
        </main>

        <publication v-bind:revele="revele" v-bind:toggleModale="toggleModale"/>
    </div>
</template>

<script>
    import Members from '../components/Members.vue'
    import News from '../components/News.vue'
    import Publication from '../components/Publication.vue'

    export default {
        name: 'Home',
        components: {
            News,
            Members,
            Publication,
        },
        data(){
            return {
                revele: false
            }
        },
        methods: {
           toggleModale: function(){
               this.revele = !this.revele
           },
            deconnexion(){
               this.$store.commit('deconnexion');
               this.$router.push('/connexion');
           }
       }
    }
</script>

<style lang='scss' scoped>
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5em 1em;

        @include mobile-tablet {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        img {
            width: 15em;
            
            @include mobile-tablet {
                margin-bottom: 1em;
            }
        }

        ul {
            display: flex;
            list-style-type: none;
            padding: 0;

            li a {
                color: $color-text;
                margin-left: 3em;

                @include mobile-tablet {
                    font-size: 13px;
                    margin: 0 1em 0 1em;
                }

                i:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                    color: $color-anchor-hover;
                }
            }
        }
    }

    main {
        display: grid;
        grid-template-columns: 4fr 0.1fr 1fr;
        gap: 2em;

        @include mobile-tablet {
            display: flex;
            flex-direction: column;

            hr {
                display: none;
            }

            .listing-members {
                display: none;
            }
        }
    }
</style>