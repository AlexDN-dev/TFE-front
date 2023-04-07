<template>
  <div class="form">
    <p>La marque</p>
    <el-select-v2 class="selector" v-model="selectMarque" filterable clearable :options="listMarque" placeholder=" "/>
    <p>Le modèle</p>
    <el-select-v2 :disabled="isDisabled" class="selector" v-model="selectModele" :options="this.listModele" placeholder=" " filterable clearable/>
    <p>Le prix maximum</p>
    <p v-if="!isValable" class="attention">Merci d'entrer un nombre entier positif valable !</p>
    <el-input v-model="maxPrix" class="selector"/>
    <a class="btn">Rechercher</a>
  </div>
  <el-checkbox label="affiner la recherche" v-model="enableFilter" class="checkbox"/>
  <div class="moreFilters" v-if="enableFilter">
    <div class="filter-container">
      <p>Kilométrage maximal</p>
      <el-input class="input" v-model="maxPrix"/>
    </div>
    <div class="filter-container">
      <p>Autonomie minimal</p>
      <el-input class="input" v-model="maxPrix"/>
    </div>
    <div class="filter-container">
      <p>Année de production</p>
      <el-input class="input" v-model="maxPrix"/>
    </div>
    <div class="filter-container">
      <p>Propriétaire(s) précédent(s)</p>
      <el-input class="input" v-model="maxPrix"/>
    </div>
    <div class="filter-container">
      <p>Nombre de portes maximum</p>
      <el-input class="input" v-model="maxPrix"/>
    </div>
    <div class="filter-container">
      <p>Type de véhicule</p>
      <el-select class="input" v-model="maxPrix" placeholder=" ">
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
import { marque, Aiways, Audi, BMW, BYD, Citroen, Cupra, Dacia, Fiat, Fisker, Ford, Honda, Hyundai, Jaguar, Jeep, Kia, Lexus, Mazda, Mercedes, MG, Mini, Nissan, Opel, Peugeot, Polestar, Porsche, Renault, Seat, Skoda, Smart, Tesla, Toyota, Volkswagen, Volvo } from "@/assets/voiture"
export default {
  name: "RechercheVoiture",
  data(){
    return {
      enableFilter: false,
      isDisabled: true,
      listMarque: marque,
      selectMarque: null,
      listModele: marque,
      selectModele: null,
      isValable: true,
      maxPrix: "",
    }
  },
  watch: {
    selectMarque: function() {
      this.isDisabled = this.selectMarque == null;
      if(this.selectMarque === "Aiways"){
        this.listModele = Aiways
      }
      else if(this.selectMarque === "Audi"){
        this.listModele = Audi
      }
      if(this.selectMarque === "BMW"){
        this.listModele = BMW
      }
      else if(this.selectMarque === "BYD"){
        this.listModele = BYD
      }
      else if(this.selectMarque === "Citroen"){
        this.listModele = Citroen
      }
      else if(this.selectMarque === "Cupra"){
        this.listModele = Cupra
      }
      else if(this.selectMarque === "Dacia"){
        this.listModele = Dacia
      }
      else if(this.selectMarque === "Fiat"){
        this.listModele = Fiat
      }
      else if(this.selectMarque === "Fisker"){
        this.listModele = Fisker
      }
      else if(this.selectMarque === "Ford"){
        this.listModele = Ford
      }
      else if(this.selectMarque === "Honda"){
        this.listModele = Honda
      }
      else if(this.selectMarque === "Hyundai"){
        this.listModele = Hyundai
      }
      else if(this.selectMarque === "Jaguar"){
        this.listModele = Jaguar
      }
      else if(this.selectMarque === "Jeep"){
        this.listModele = Jeep
      }
      else if(this.selectMarque === "Kia"){
        this.listModele = Kia
      }
      else if(this.selectMarque === "Lexus"){
        this.listModele = Lexus
      }
      else if(this.selectMarque === "Mazda"){
        this.listModele = Mazda
      }
      else if(this.selectMarque === "Mercedes"){
        this.listModele = Mercedes
      }
      else if(this.selectMarque === "MG"){
        this.listModele = MG
      }
      else if(this.selectMarque === "Mini"){
        this.listModele = Mini
      }
      else if(this.selectMarque === "Nissan"){
        this.listModele = Nissan
      }
      else if(this.selectMarque === "Opel"){
        this.listModele = Opel
      }
      else if(this.selectMarque === "Peugeot"){
        this.listModele = Peugeot
      }
      else if(this.selectMarque === "Polestar"){
        this.listModele = Polestar
      }
      else if(this.selectMarque === "Porsche"){
        this.listModele = Porsche
      }
      else if(this.selectMarque === "Renault"){
        this.listModele = Renault
      }
      else if(this.selectMarque === "Seat"){
        this.listModele = Seat
      }
      else if(this.selectMarque === "Skoda"){
        this.listModele = Skoda
      }
      else if(this.selectMarque === "Smart"){
        this.listModele = Smart
      }
      else if(this.selectMarque === "Tesla"){
        this.listModele = Tesla
      }
      else if(this.selectMarque === "Toyota"){
        this.listModele = Toyota
      }
      else if(this.selectMarque === "Volkswagen"){
        this.listModele = Volkswagen
      }
      else if(this.selectMarque === "Volvo"){
        this.listModele = Volvo
      }

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