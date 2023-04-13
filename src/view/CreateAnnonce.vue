<template>
  <Navbar/>
  <h2>Voici un formulaire pour pouvoir ajouter votre annonce à notre site</h2>
  <h3>Chaque annonce est sujette à une inspection par un administrateur de la plateforme avant la mise en ligne. Vous recevrez une notification quand l'annonce aura été accepté ou non.</h3>
  <el-divider/>
  <p class="title">Les photos de votre annonce</p>
  <el-upload
      class="upload-demo"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      multiple="true"
      :file-list="fileList"
      :list-type="'picture-card'"
      :default-file-list="fileList"
      limit="15"
      :auto-upload="false">
    <template v-slot:trigger>
      <el-button class="addPicture" size="small" type="primary">Ajouter vos photos</el-button>
    </template>
    <template v-slot:tip>
      <div class="el-upload__tip">Seulement des fichiers au format jpg/png avec une taille maximale de 2Mo</div>
    </template>
  </el-upload>
  <div class="car-informations">
    <div>
      <p class="title">La marque</p>
      <el-select-v2 class="selector" v-model="selectMarque" filterable clearable :options="listMarque" placeholder=" "/>
    </div>
    <div>
      <p class="title">Le modèle</p>
      <el-select-v2 class="selector" v-model="selectModele" :options="this.listModele" placeholder=" " filterable clearable/>
    </div>
    <div>
      <p class="title">Le type</p>
      <el-select-v2 class="selector" v-model="selectModele" :options="this.listModele" placeholder=" " filterable clearable/>
    </div>
    <div>
      <p class="title">Le kilométrage</p>
      <el-input class="input" v-model="text"/>
    </div>
    <div>
      <p class="title">Le prix</p>
      <el-input class="input" v-model="text"/>
    </div>
    <div>
      <p class="title">Le nombre de propriétaire</p>
      <el-input class="input" v-model="text"/>
    </div>
    <div>
      <p class="title">État du véhicule</p>
      <el-select-v2 class="selector" v-model="selectModele" :options="this.listModele" placeholder=" " filterable clearable/>
    </div>
  </div>
  <el-divider/>
  <h2>Élement non obligatoire</h2>
  <div class="car-informations-secondary">
    <div>
      <p class="title">Description du véhicule</p>
      <textarea class="car-description"/>
    </div>
    <div>
      <p class="title">Liste d'équipement</p>
      <textarea class="car-description" placeholder="Merci de séparer vos équipement par une virgule entre chaque."/>
    </div>
  </div>
  <div class="car-informations">
    <div>
      <p class="title">La couleur</p>
      <el-input class="input" v-model="text"/>
    </div>
    <div>
      <p class="title">Le nombre de portes</p>
      <el-input class="input" v-model="text"/>
    </div>
  </div>
  <div style="width: 100%; display: flex; justify-content: center">
    <el-button class="btn" type="success">Envoyer</el-button>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "CreateAnnonce",
  components: {Footer, Navbar},
  data() {
    return {
      fileList: [],
      selectMarque: null,
      selectModele: null,
      listMarque: [
          "marque 1",
          "marque 2",
          "marque 3"
      ],
      listModele: [
          "Modele 1",
          "Modele 2",
          "Modele 3"
      ],
      text: null
    };
  },
  methods: {
    handlePreview(file) {
      window.open(file.url, '_blank');
    },
    handleRemove(file, fileList) {
      console.log('Fichier supprimé', file, fileList);
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Le fichier doit être au format JPG/PNG');
      }
      if (!isLt2M) {
        this.$message.error('La taille du fichier ne doit pas dépasser 2 Mo');
      }
      return isJPG && isLt2M;
    },
    handleSuccess(response, file, fileList) {
      console.log('Téléchargement réussi', response, file, fileList);
    }
  }
}
</script>

<style scoped>
  h2, h3 {
    text-align: center;
    margin: 15px;
  }
  h3 {
    font-size: 15px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .upload-demo {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }
  .addPicture {
    width: 125px;
    height: 50px;
    text-align: center;
  }
  .car-informations {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .car-informations div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }
  .car-informations div p {
    margin: 0;
  }
  .car-informations-secondary {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  .car-informations-secondary div {
     display: flex;
     flex-direction: column;
     align-items: center;
     width: 100%;
  }
  .car-informations-secondary div textarea:focus {
    outline: none !important;
  }
  .car-description {
    resize: none;
    width: 75%;
    height: 50px;
    margin: 0 10px 10px;
  }
  .btn {
    width: 200px;
    margin: 10px;
    height: 30px;
  }
</style>