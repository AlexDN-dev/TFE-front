<template>
  <Navbar/>
  <h2>Inscription</h2>
  <form>
    <div>
      <div class="container">
        <p>Nom*</p>
        <el-input></el-input>
      </div>
      <div class="container">
        <p>Prénom*</p>
        <el-input></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Adresse mail*</p>
        <el-input></el-input>
      </div>
      <div class="container">
        <p>Répéter l'adresse*</p>
        <el-input></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Mot de passe*</p>
        <el-input></el-input>
      </div>
      <div class="container">
        <p>Répéter le mot de passe*</p>
        <el-input></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Âge</p>
        <el-input></el-input>
      </div>
      <div class="container">
        <p>Numéro de téléphone</p>
        <el-input></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Ville</p>
        <el-input></el-input>
      </div>
      <div class="container">
        <p>Code postal</p>
        <el-input></el-input>
      </div>
    </div>
    <div class="connexion">
      <p>Connexion</p>
    </div>
  </form>
  <h3>Pas encore de compte ? <router-link to="/connexion" class="router"><span>Inscrivez-vous</span></router-link> !</h3>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Inscription",
  components: {Footer, Navbar}
}
</script>

<style scoped>
  h2, h3 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  form div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .container{
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container p {
    margin: 0 0 5px;
  }
  .connexion {
    background-color: #8bc34a;
    color: white;
    border-radius: 10px;
    margin: 20px;
    cursor: pointer;
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