<template>
    <div> 
        <nav>
            <img src="../assets/icon-left-font-monochrome-white.png" alt="">
            <ul>
                <li><router-link to="/home"><i class="fas fa-home fa-2x"></i></router-link></li>
                <li><router-link to="/home"><i class="fas fa-plus fa-2x"></i></router-link></li>
                <li><router-link to="/profile"><i class="fas fa-user fa-2x"></i></router-link></li>
            </ul>
        </nav>

        <hr>
    </div>
    
</template>

<script>
    export default {
       name: 'Nav' 
    }
</script>

<style lang="scss" scoped>
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
                color: white;
                margin-left: 3em;

                i:hover {
                    transform: scale(1.1);
                    color: #365665;
                }
            }
        }
    }
</style>