<template>
  <Navbar/>
    <h3>Ici, vous pouvez retrouver les informations lié au garage. Vous pouvez également les modifiers à votre guise.</h3>
  <div class="input-container">
    <div>
      <p>Nom</p>
      <el-input v-model="text"></el-input>
    </div>
    <div>
      <p>Adresse</p>
      <el-input v-model="text"></el-input>
    </div>
    <div>
      <p>Latitude et longitude</p>
      <el-input v-model="text" placeholder="latitude"></el-input>
      <el-input v-model="text" placeholder="longitude"></el-input>
      <h4>Trouvable facilement via google map, si vous ne trouvez pas contacter un admin pour qu'il vous l'ajoute.</h4>
    </div>
    <div>
      <p>Heure d'ouverture (format 8h-17h)</p>
      <div>
        <el-input v-model="text" placeholder="lundi"></el-input>
        <el-input v-model="text" placeholder="mardi"></el-input>
        <el-input v-model="text" placeholder="mercredi"></el-input>
        <el-input v-model="text" placeholder="jeudi"></el-input>
        <el-input v-model="text" placeholder="vendredi"></el-input>
        <el-input v-model="text" placeholder="samedi"></el-input>
        <el-input v-model="text" placeholder="dimanche"></el-input>
      </div>
    </div>
  </div>
  <div class="btn-container">
    <el-button class="btn">Valider</el-button>
    <el-button>Ajouter une annonce</el-button>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "GarageSettings",
  components: {Footer, Navbar},
  data() {
    return {
      text: null
    }
  }
}
</script>

<style scoped>
  h3 {
    text-align: center;
    margin: 20px;
    font-size: 20px;
  }
  h4 {
    text-align: center;
  }
  .input-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .input-container div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 5px;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    margin: 5px;
  }
</style>