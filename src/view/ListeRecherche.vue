<template>
  <Navbar/>
  <div class="listeRecherche">
    <div class="header">
      <p>Nous avons pu trouver <span>X</span> annonces par rapport au(x) filtre(s) que vous nous avez indiqué précédemment.</p>
    </div>
    <div class="annonce-container">
      <router-link to="/annonce/voiture" class="routing"><AnnonceVoitureMini/></router-link>
      <router-link to="/annonce/garage" class="routing"><AnnonceGarageMini/></router-link>
    </div>
    <el-pagination class="pagination" layout="prev, pager, next" :total="100" />
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnnonceVoitureMini from "@/components/AnnonceVoitureMini.vue";
import AnnonceGarageMini from "@/components/AnnonceGarageMini.vue";

export default {
  name: "ListeRecherche",
  components: {AnnonceGarageMini, AnnonceVoitureMini, Footer, Navbar}
}
</script>
<style scoped>
  .header {
    text-align: center;
  }
  .header span {
    font-weight: bold;
  }
  .annonce-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .listeRecherche {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pagination {
    margin: 10px;
  }
  .routing {
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
  }
</style>