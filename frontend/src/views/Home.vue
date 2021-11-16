<template>
    <div>
        <nav>
            <img src="../assets/icon-left-font-monochrome-white.png" alt="">
            <ul>
                <li><router-link to="/home" title="Accueil"><i class="fas fa-home fa-2x"></i></router-link></li>
                <li><a @click="toggleModale" title="Créer une publication"><i class="fas fa-plus fa-2x"></i></a></li>
                <li><router-link to="/profile" title="Profil"><i class="fas fa-user fa-2x"></i></router-link></li>
                <li><a @click="deconnexion" title="Déconnexion"> <i class="fas fa-sign-out-alt fa-2x"></i></a></li>
            </ul>
        </nav>

        <hr>

        <main>
            <news></news>
            <hr>
            <members></members>
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
    main {
        display: grid;
        grid-template-columns: 4fr 0.1fr 1fr;
        gap: 2em;
    }

        nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.5em 1em;

        img {
            width: 15em;
        }

        ul {
            display: flex;
            align-items: center;
            list-style-type: none;

            li a{
                color: $color-text;
                margin-left: 3em;

                i:hover {
                    transform: scale(1.1);
                    transition: 0.5s;
                    color: $color-anchor-hover;
                }
            }
        }
    }
</style>