<template>
  <Navbar/>
  <h3>Ici, vous pouvez retrouver les informations personnelles lié à votre compte. Vous pouvez également les modifiers à votre guise.</h3>
  <p style="text-align: center">Photo de profil</p>
  <el-upload
      class="upload-demo"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      multiple="false"
      :file-list="fileList"
      :list-type="'picture-card'"
      :default-file-list="fileList"
      limit="1"
      :auto-upload="false">
    <template v-slot:trigger>
      <el-button class="addPicture" size="small" type="primary">Ajouter vos photos</el-button>
    </template>
    <template v-slot:tip>
      <div class="el-upload__tip">Seulement des fichiers au format jpg/png avec une taille maximale de 2Mo</div>
    </template>
  </el-upload>
  <div class="personnal-informations">
    <p>Adresse mail : <span>test@hotmail.be</span></p>
    <p>Date de naissance : 06/07/2001, <span>21 ans</span></p>
    <p>Adresse : <span>Rue de la croisette, 12 </span><span>6500</span><span>Beaumont</span></p>
  </div>
  <div class="user-informations">
    <div>
      <p>Modifier le mot de passe</p>
      <el-input placeholder="Ancien mot de passe"></el-input>
      <el-input placeholder="Nouveau mot de passe"></el-input>
      <el-input placeholder="Répéter le nouveau"></el-input>
      <el-button>Valider</el-button>
    </div>
    <div>
      <div>
        <p id="text" class="datePicker">Modifier la date de naissance</p>
        <el-date-picker v-model="date" type="date"/>
      </div>
      <div>
        <p class="datePicker">Modifier le numéro de téléphone</p>
        <el-input placeholder="Numéro de téléphone"></el-input>
      </div>
      <el-button class="valid-btn">Valider</el-button>
    </div>
    <div>
      <p>Informations personelles</p>
      <el-input placeholder="Rue et numéro"></el-input>
      <el-input placeholder="code postal"></el-input>
      <el-input placeholder="Ville"></el-input>
      <el-button>Valider</el-button>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "UserSettings",
  components: {Footer, Navbar},
  data() {
    return {
      fileList: [],
      text: null,
      date: null
    }
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
  h3 {
    text-align: center;
    margin: 20px;
    font-size: 20px;
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
  .personnal-informations {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-image: linear-gradient(to left bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
    margin: 10px;
    border-radius: 10px;
  }
  .personnal-informations p {
    margin: 10px;
  }
  .user-informations {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .user-informations div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 10px;
  }
  .user-informations p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .valid-btn {
    position: relative;
    bottom: 0;
  }
</style>