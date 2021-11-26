<template>
    <section>
        <article>
            <h1>Votre compte a été supprimé avec succès</h1>
            <button @click="redirection">Aller à la page d'inscription</button>
        </article>
    </section>
</template>

<script>
export default {
    name: 'AccountDelete',
    
    methods: {
        redirection(){
            this.$router.push("/subscribe");
        }
    }
}
</script>

<style lang="scss" scoped>
    section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        article {
            background-color: white;
            padding: 1em;
            border-radius: 0.5em;
            
            @include mobile-tablet {
                padding: 0.5em
            }

            button {
               @include btn-modify; 
            }
        }
    }
</style>