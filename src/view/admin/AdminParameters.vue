<template>
  <AdminNavBar/>
  <h2 style="margin-top: 20px">Les marques et modèles présents</h2>
  <div class="selector-container">
    <p class="title">La marque</p>
    <el-select v-model="deleteMarque" placeholder="Marque" filterable>
      <el-option v-for="(marque, index) in listMarque" :key="index" :label="marque.marque" :value="marque.marque"></el-option>
    </el-select>
    <p class="title">Le modèle</p>
    <el-select v-model="deleteModele" placeholder="Sélectionnez un modèle">
      <el-option v-for="(modele, index) in modelOptions" :key="index" :label="modele" :value="modele"/>
    </el-select>
    <el-button type="danger" @click="deletedMarque">Supprimer</el-button>
  </div>
  <el-divider/>
  <h2>Ajouter une marque</h2>
  <div class="selector-container">
    <el-input v-model="addMarque" class="selector" placeholder="Nom de la nouvelle marque"/>
    <el-button type="primary" @click="addedMarque">Ajouter</el-button>
  </div>
  <el-divider/>
  <h2>Ajouter un modèle</h2>
  <div class="selector-container">
    <el-select v-model="marqueForAddModele" placeholder="Marque" filterable>
      <el-option v-for="(marque, index) in listMarque" :key="index" :label="marque.marque" :value="marque.marque"></el-option>
    </el-select>
    <el-input class="selector" v-model="addModele" placeholder="Nom du nouveau modèle"/>
    <el-button type="primary" style="margin-bottom: 36px" @click="addedModele">Ajouter</el-button>
  </div>
  <Footer/>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";
import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "AdminParameters",
  components: {Footer, AdminNavBar},
  data(){
    return {
      value: ref([]),
      props: {
        multiple: true
      },
      deleteMarque: null,
      deleteModele: null,
      modelOptions: [],
      listMarque: [],
      addMarque: null,
      marqueForAddModele: null,
      addModele: null
    }
  },
  watch: {
    'deleteMarque': {
      handler(newMarque) {
        if (newMarque) {
          this.fetchModelOptions(newMarque);
        } else {
          this.modelOptions = []; // Réinitialiser les options de modèle si la marque est vide
          this.deleteModele = ""
          this.marqueForAddModele = ""
        }
      },
    },
  },
  methods: {
    fetchModelOptions(marque) {
      this.deleteModele = ""
      axios.get(`http://localhost:3000/options/getModele?marque=${marque}`)
          .then((response) => {
            this.modelOptions = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    deletedMarque(){
      if(this.deleteModele !== null){
        axios.post('http://localhost:3000/options/delete', {deleteMarque: this.deleteMarque, deleteModele: this.deleteModele})
            .then((res) => {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: "success"
              })
              this.$router.go()
            })
            .catch((err) => {
              console.log(err)
            })
      }else {
        ElMessage.error({
          showClose: true,
          message: "Merci de remplir au moins le modèle."
        })
      }
    },
    addedMarque(){
      if(this.addMarque !== null){
        axios.post('http://localhost:3000/options/addMarque', {addMarque: this.addMarque})
            .then((res) => {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: "success"
              })
              this.$router.go()
            })
            .catch((err) => {
              ElMessage({
                showClose: true,
                message: err.response.data.error.message,
                type: "error"
              })
            })
      }else {
        ElMessage.error({
          showClose: true,
          message: "Impossible d'effectuer de changement si le champ est vide."
        })
      }
    },
    addedModele(){
      if(this.marqueForAddModele !== null && this.addModele !== null){
        axios.post('http://localhost:3000/options/addModele', {marque: this.marqueForAddModele, modele: this.addModele})
            .then((res) => {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: "success"
              })
              this.$router.go()
            })
            .catch((err) => {
              ElMessage({
                showClose: true,
                message: err.response.data.error.message,
                type: "error"
              })
            })
      }else {
        ElMessage.error({
          showClose: true,
          message: "Impossible d'effectuer de changement si les champs sont vide."
        })
      }
    },
  },
  mounted() {
    axios.get("http://localhost:3000/options/getMarque")
        .then((res) => {
          this.listMarque = res.data
        })
  }

}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  .selector {
    width: 300px;
    margin: 10px;
  }
  .selector-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .selector-container .el-button {
    margin: 10px;
  }
</style>