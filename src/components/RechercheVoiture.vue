<template>
  <div class="form">
    <p>La marque</p>
    <el-select class="selector" v-model="options.marque" placeholder="Marque" filterable>
      <el-option v-for="(marque, index) in listMarque" :key="index" :label="marque.marque" :value="marque.marque"></el-option>
    </el-select>
    <p>Le modèle</p>
    <el-select class="selector" v-model="options.modele" placeholder="Sélectionnez un modèle">
      <el-option v-for="(modele, index) in modelOptions" :key="index" :label="modele" :value="modele"/>
    </el-select>
    <p>Le prix maximum</p>
    <el-input type="number" v-model="options.prix" class="selector"/>
    <a @click="search" class="btn">Rechercher</a>
  </div>
  <el-checkbox label="affiner la recherche" v-model="enableFilter" class="checkbox"/>
  <div class="moreFilters" v-if="enableFilter">
    <div class="filter-container">
      <p>Kilométrage maximal</p>
      <el-input type="number" class="input" v-model="options.kmMax"/>
    </div>
    <div class="filter-container">
      <p>Autonomie minimal</p>
      <el-input type="number" class="input" v-model="options.autonomieMax"/>
    </div>
    <div class="filter-container">
      <p>Année de production</p>
      <el-input type="number" class="input" v-model="options.anneeProd"/>
    </div>
    <div class="filter-container">
      <p>Propriétaire(s) précédent(s)</p>
      <el-input type="number" class="input" v-model="options.numOwnerMax"/>
    </div>
    <div class="filter-container">
      <p>Nombre de portes maximum</p>
      <el-input type="number" class="input" v-model="options.numDoorsMax"/>
    </div>
    <div class="filter-container">
      <p>Type de véhicule</p>
      <el-select class="input" v-model="options.type" placeholder=" ">
        <el-option label="Citadine" value="Citadine"/>
        <el-option label="SUV" value="SUV"/>
        <el-option label="Berline" value="Berline"/>
        <el-option label="Coupé" value="Coupé"/>
        <el-option label="Utilitaire" value="Utilitaire"/>
      </el-select>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RechercheVoiture",
  data(){
    return {
      enableFilter: false,
      isDisabled: true,
      listMarque: [],
      modelOptions: [],
      options: {
        marque: "",
        modele: "",
        prix: "",
        kmMax: "",
        autonomieMin: "",
        anneeProd: "",
        numOwnerMax: "",
        numDoorsMax: "",
        type: ""
      }
    }
  },
  methods: {
    fetchModelOptions(marque) {
      axios.get(`http://localhost:3000/options/getModele?marque=${marque}`)
          .then((response) => {
            this.modelOptions = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    search(){
      let query = {}
      if(this.options.marque !== ""){
        query.marque = this.options.marque
      }
      if(this.options.modele !== ""){
        query.modele = this.options.modele
      }
      if(this.options.prix !== ""){
        query.prix = this.options.prix
      }
      if(this.options.kmMax !== ""){
        query.kmMax = this.options.kmMax
      }
      if(this.options.autonomieMin !== ""){
        query.autonomieMin = this.options.autonomieMin
      }
      if(this.options.anneeProd !== ""){
        query.anneeProd = this.options.anneeProd
      }
      if(this.options.numOwnerMax !== ""){
        query.numOwnerMax = this.options.numOwnerMax
      }
      if(this.options.numDoorsMax !== ""){
        query.numDoorsMax = this.options.numDoorsMax
      }
      if(this.options.type !== ""){
        query.type = this.options.type
      }
      this.$router.push({
        path: '/recherche/resultats/',
        query: query
      })
    }
  },
  mounted() {
    axios.get("http://localhost:3000/options/getMarque")
        .then((res) => {
          this.listMarque = res.data
        })
  },
  watch: {
    'options.marque': {
      handler(newMarque) {
        if (newMarque) {
          this.options.modele = ""
          this.fetchModelOptions(newMarque);
        } else {
          this.modelOptions = []; // Réinitialiser les options de modèle si la marque est vide
          this.options.modele = ""
        }
      },
    },
  },
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
  .selector {
    width: 300px;
    margin: 10px;
  }
  .btn {
    margin: 10px;
    border: 2px solid black;
    padding: 10px 15px;
    border-radius: 25px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
  .checkbox {
    margin-left: 15px;
  }
  .moreFilters {
    width: 100%;
    margin: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 25%;
    text-align: center;
  }
  .filter-container p{
    margin: 0;
  }
  .input {
    margin-top: 5px;
    width: 250px;
  }
  @media screen and (max-width:1024px) {
    .moreFilters {
      flex-direction: column;
      margin: 0;
    }
  }
</style>