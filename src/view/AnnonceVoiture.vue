<template>
  <Navbar/>
  <div class="header">
    <div class="carousel">
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="(item, index) in items" :key="index">
          <img :src="item.src" alt="image">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="seller-informations-container">
      <div class="btn_alert">
        <a href="#"><font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="lg" style="color: #ff0000;" /></a>
      </div>
      <div class="avatar-container">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="avatar"/>
      </div>
      <div class="seller-informations">
        <p class="name">De Nève Alexandre</p>
        <div style="display: flex; align-items: center; margin: 0">
          <font-awesome-icon icon="fa-solid fa-location-dot" size="lg" style="color: #000000;" />
          <p>Charleroi, Hainaut</p>
        </div>
        <p>tel: 0499 / 35 75 48</p>
        <el-button class="btn" type="success" text bg>Contacter le vendeur</el-button>
        <el-button class="btn" type="success" text bg>Voir ses annonces</el-button>
      </div>
    </div>
  </div>
  <div class="main-informations">
    <h3>Informations principales</h3>
    <div class="info">
      <div class="informations-container">
        <p style="font-weight: bold">Kilométrage</p>
        <p>126.000 km</p>
      </div>
      <div class="informations-container">
        <p style="font-weight: bold">Année de production</p>
        <p>06/2011</p>
      </div>
      <div class="informations-container">
        <p style="font-weight: bold">Puissance</p>
        <p>400 kW (544CH)</p>
      </div>
      <div class="informations-container">
        <p style="font-weight: bold">Autonomie</p>
        <p>300Km</p>
      </div>
    </div>
  </div>
  <el-divider/>
  <div>
      <h3>Informations supplémentaires</h3>
    <div class="secondary-informations-container">
      <div class="secondary-informations">
        <div>
          <p>Nombre de propriétaire(s) précédent(s) : </p><span>2</span>
        </div>
        <div>
          <p>Nombre de portes :</p><span>5</span>
        </div>
        <div>
          <p>Type de véhicule : </p><span>Berline</span>
        </div>
        <p>Liste d'équipement :</p>
        <ul>
          <li>Vitre électrique</li>
          <li>Start and stop</li>
          <li>Bluetooth</li>
        </ul>
      </div>
      <div class="description-container">
        <p>Description du vendeur</p>
        <p>Voiture en parfait état, je souhaite la vendre car j'aimerais passer à autre chose.</p>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "AnnonceVoiture",
  components: {Footer, Navbar},
  data() {
    return {
      items: [
        {src: "https://image.noelshack.com/fichiers/2023/14/5/1680851664-pexels-oleksandr-pidvalnyi-376361.jpg"},
        {src: "https://image.noelshack.com/fichiers/2023/14/5/1680851664-pexels-ryan-west-1719648.jpg"},
        {src: "https://image.noelshack.com/fichiers/2023/14/5/1680851664-pexels-abdulwahab-alawadhi-3422964.jpg"},
        {src: "https://image.noelshack.com/fichiers/2023/14/5/1680851920-pexels-cesar-perez-733745.jpg"}
      ]
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
  }
  .carousel {
    width: 100%;
    margin: 10px;
  }
  .carousel img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
  }
  .seller-informations-container {
    position: relative;
    background-image: linear-gradient(to right bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
    width: 40%;
    height: 300px;
    border-radius: 5px;
    margin: 10px;
  }
  .seller-informations {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .seller-informations .name {
    margin-top: 25px;
    font-weight: bold;
  }
  .seller-informations p {
    margin: 5px;
  }
  .avatar-container {
    display: flex;
    justify-content: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    margin-top: 10px;
  }
  .btn {
    margin: 10px;
    color: black;
  }
  .btn_alert {
    position: absolute;
    right: 15px;
    top: 15px;
  }
  h3 {
    margin-left: 10px;
    font-size: 1.5rem;
  }
  .info {
    display: flex;
    justify-content: space-evenly;
  }
  .informations-container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .informations-container p {
    margin: 5px;
  }
  .secondary-informations-container {
    display: flex;
    justify-content: space-between;
  }
  .secondary-informations {
    margin-left: 10px;
  }
  .secondary-informations div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .secondary-informations div span {
    position: relative;
    margin-left: 5px;
    top: 1px;
    font-weight: bold;
  }
  .secondary-informations li {
    margin: 2px;
  }
  .description-container {
    width: 450px;
  }
  .description-container p:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
  @media screen and (max-width:1024px) {
    .header {
      flex-direction: column;
      align-items: center;
    }
    .seller-informations-container {
      width: 80%;
      margin: 0;
    }
    .info {
      flex-wrap: wrap;
    }
    .secondary-informations-container {
      flex-wrap: wrap;
    }
    .description-container {
      margin: 10px;
    }
  }
  @media screen and (max-width: 426px) {
    .info {
      flex-direction: column;
    }
  }
</style>