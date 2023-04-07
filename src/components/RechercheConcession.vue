<template>
  <div>
    <div class="form">
      <p>Nom</p>
      <el-input class="selector" v-model="this.Concession.nom"/>
      <p>Localisation</p>
      <el-input class="selector" v-model="this.Concession.location"/>
      <p>Marque(s) vendue(s)</p>
      <el-select-v2 class="selector" v-model="selectedMarque" filterable :options="listMarque" placeholder=" " multiple/>
      <a class="btn">Rechercher</a>
    </div>
  </div>
</template>

<script>
import {marque} from "@/assets/voiture";

export default {
  name: "RechercheConcession",
  data(){
    return {
      selectedMarque: "",
      listMarque: marque,
      Concession: {
        nom: "",
        location: ""
      }
    }
  }
}
</script>

<style scoped>
  .form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .form p {
    margin: 0;
  }
  .btn {
    margin: 10px;
    border: 2px solid black;
    padding: 10px 15px;
    border-radius: 25px;
    cursor: pointer;
  }
  .selector {
    width: 300px;
    margin: 10px;
  }
</style>