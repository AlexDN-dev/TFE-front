<template>
  <Navbar/>
  <h2 style="margin-top: 32px">Connexion</h2>
  <div class="form">
    <div>
      <p>Mail</p>
      <el-input></el-input>
    </div>
    <div>
      <p>Mot de passe</p>
      <el-input></el-input>
    </div>
    <el-checkbox label="Se souvenir de moi"></el-checkbox>
    <div class="connexion">
      <p>Connexion</p>
    </div>
  </div>
  <h3 style="margin: 20px">Pas encore de compte ? <router-link to="/inscription" class="router"><span>Inscrivez-vous</span></router-link> !</h3>
  <h3>Mot de passe oublié ? Réinitialisé le <router-link to="/inscription" class="router"><span>ici</span></router-link>.</h3>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Connexion",
  components: {Footer, Navbar}
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  h3 {
    text-align: center;
    font-size: 1rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .connexion {
    background-color: #8bc34a;
    color: white;
    border-radius: 10px;
    margin: 20px;
  }
  .connexion p {
    margin: 0;
    padding: 10px 10px;
  }
  .router {
    text-decoration: none;
    color: #8bc34a;
  }
</style>