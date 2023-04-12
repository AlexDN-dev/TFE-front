<template>
  <Navbar/>
  <div class="container">
    <div class="informations">
      <h2>Nom du garage</h2>
      <p>Bref description écrite par le gérant de la page.</p>
      <p>Rue du chêne 12, 7000 Mons</p>
      <h3>Heure d'ouverture</h3>
      <ul>
        <li>Lundi: Fermé</li>
        <li>Mardi: 9h - 17h</li>
        <li>Mercredi: 9h - 17h</li>
        <li>Jeudi: 9h - 17h</li>
        <li>Vendredi: 9h - 17h</li>
        <li>Samedi: 9h - 17h</li>
        <li>Dimanche: 9h - 17h</li>
      </ul>
    </div>
    <div class="carte">
      <l-map ref="map" :zoom="zoom" :center="markerPosition">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"/>
        <l-marker :lat-lng="markerPosition"/>
      </l-map>
    </div>
    <el-divider/>
  </div>
  <h2 class="title">Les annonces du garage</h2>
  <div class="annonce-container">
    <router-link to="/annonce/voiture" class="routing"><AnnonceVoitureMini/></router-link>
    <router-link to="/annonce/voiture" class="routing"><AnnonceVoitureMini/></router-link>
    <router-link to="/annonce/voiture" class="routing"><AnnonceVoitureMini/></router-link>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import AnnonceVoitureMini from "@/components/AnnonceVoitureMini.vue";

export default {
  name: "AnnonceGarage",
  components: {AnnonceVoitureMini, Footer, Navbar, LMap, LTileLayer, LMarker},
  data() {
    return {
      zoom: 15,
      markerPosition: [50.850340, 4.351710]
    };
  },
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .informations {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 2;
    flex-basis: 30%;
  }
  .informations h2 {
    text-align: center;
  }
  .informations p {
    text-align: center;
  }
  .informations ul {
    padding: 0;
  }
  .informations li {
    text-align: center;
    list-style: none;
  }
  .carte {
    width: 400px;
    height: 400px;
    margin: 10px;
  }
  .title {
    text-align: center;
    width: 100%;
  }
  .annonce-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .routing {
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
  }
</style>