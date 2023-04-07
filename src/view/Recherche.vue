<template>
  <Navbar/>
    <div class="title">
      <h2>Page recherche</h2>
      <p>Voici une multitudes de filtres que vous pouvez remplir afin d'affiner vos recherches dans les annonces.</p>
      <h3>Vous recherchez...</h3>
      <div class="selectMode">
        <p>Une annonce</p>
        <el-button id="selectModeButton" :icon="Back" bg text circle @click="swapMode"></el-button>
        <p>Une concession</p>
      </div>
    </div>
    <RechercheVoiture v-if="!searchGarage"/>
    <RechercheConcession v-if="searchGarage"/>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import RechercheVoiture from "@/components/RechercheVoiture.vue";
import {Back} from "@element-plus/icons-vue";
import RechercheConcession from "@/components/RechercheConcession.vue";

export default {
  name: "Recherche",
  computed: {
    Back() {
      return Back
    }
  },
  components: {RechercheConcession, RechercheVoiture, Footer, Navbar},
  data(){
    return {
      searchGarage: false
    }
  },
  methods: {
    swapMode(){
      const btn = document.getElementById("selectModeButton");
      btn.classList.toggle("changeMode")
      this.searchGarage = !this.searchGarage
    }
  }
}
</script>

<style scoped>
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .title h2 {
    font-weight: bold;
    font-size: 2rem;
    margin: 10px;
  }
  .title p {
    text-align: center;
    font-size: 1.2rem;
  }
  .selectMode {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .changeMode {
    transition: 0.5s;
    transform: rotateZ(180deg);
  }
  #selectModeButton {
    background-color: #81C784;
    transition: 0.5s;
    position: relative;
    margin: 10px;
  }
</style>