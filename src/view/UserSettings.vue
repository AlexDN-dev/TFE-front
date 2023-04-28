<template>
  <Navbar/>
  <h3>Ici, vous pouvez retrouver les informations personnelles lié à votre compte. Vous pouvez également les modifiers à votre guise.</h3>
  <p style="text-align: center">Photo de profil</p>
  <el-upload
      ref="upload"
      class="upload-demo"
      action="http://www.localhost:3000/users/addPicture"
      :data="{id: userData.id}"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      multiple="false"
      :file-list="picture"
      :list-type="'picture-card'"
      :default-file-list="picture"
      limit="1"
      :auto-upload="false">
    <template v-slot:trigger>
      <el-button class="addPicture" size="small" type="primary">Ajouter vos photos</el-button>
    </template>
    <template v-slot:tip>
      <div class="el-upload__tip">Seulement des fichiers au format jpg/png avec une taille maximale de 2Mo</div>
    </template>
  </el-upload>
  <div style="display: flex; justify-content: center;">
    <el-button @click="submitUpload">Valider</el-button>
  </div>
  <el-divider/>
  <div class="user-informations">
    <div class="button">
      <p>Modifier le mot de passe</p>
      <div>
        <el-input v-model="password.oldPassword" type="password" placeholder="Ancien mot de passe"></el-input>
        <el-input v-model="password.newPassword" type="password" placeholder="Nouveau mot de passe"></el-input>
        <el-input v-model="password.repeatPassword" type="password" placeholder="Répéter le nouveau"></el-input>
      </div>
      <el-button @click="changePassword" :disabled="this.password.oldPassword === '' || this.password.newPassword === '' || this.password.repeatPassword === ''">Valider</el-button>
    </div>
    <div class="button">
      <p>Modifier le numéro de téléphone</p>
      <div>
        <el-input v-model="phoneNumber" :placeholder="userData.phoneNumber"></el-input>
      </div>
      <el-button>Valider</el-button>
    </div>
    <div class="button">
      <p>Informations personelles</p>
      <div>
        <el-input v-model="coords.city" :placeholder="userData.city"></el-input>
        <el-input v-model="coords.postalCode" :placeholder="userData.postalCode"></el-input>
      </div>
      <el-button>Valider</el-button>
    </div>
    <el-button type="danger" style="margin: 15px">Supprimer mon compte</el-button>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import {getToken, hasToken, logout} from "@/router/middleware";
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
  name: "UserSettings",
  components: {Footer, Navbar},
  data() {
    return {
      picture: [],
      userData: {
        id: "",
        phoneNumber: "",
        city: "",
        postalCode: ""
      },
      password: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      },
      phoneNumber: "",
      coords: {
        city: "",
        postalCode: ""
      }
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
    handleSuccess(response) {
      if (response.path) {
        ElMessage({
          showClose: true,
          message: 'Votre photo de profil à été chargé avec succès !',
          type: "success"
        })
      } else {
        ElMessage.error({
          showClose: true,
          message: 'Votre photo de profil à été chargé avec succès !'
        })
      }
    },
    async submitUpload() {
      try {
        await this.$refs.upload.submit();
      } catch (err) {
        console.log(err);
      }
    },
    changePassword(){
      if(this.password.oldPassword === "" || this.password.newPassword === "" || this.password.repeatPassword === ""){
        ElMessage.error({
          showClose: true,
          message: 'Merci de remplir tous les champs !'
        })
      }else {
        this.password = {...this.password, id: this.userData.id}
        axios.post("http://www.localhost:3000/users/changePassword", this.password)
            .then((res) => {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'success'
              })
              logout()
              this.$router.push('/connexion')
            })
            .catch((err) => {
              ElMessage.error({
                showClose: true,
                message: err.response.data.error
              })
            })
      }
    }
  },
  mounted() {
    if(!hasToken()){
      this.$router.push('/connexion')
      ElMessage.error({
        message: "Il faut être connecté pour vous rendre sur cette page !",
        showClose: true
      })
    }
    const token = getToken()
    axios.post("http://localhost:3000/token", token)
        .then((res) => {
          this.userData.id = res.data.token.id
          axios.post('http://localhost:3000/users/data', res.data.token.id)
              .then((res) => {
                this.userData.phoneNumber = res.data.data.phoneNumber
                this.userData.city = res.data.data.city
                this.userData.postalCode = res.data.data.postalCode
              })
        })
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
  .personnal-informations p {
    margin: 10px;
  }
  .user-informations {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    flex-wrap: wrap;
  }
  .user-informations p {
    margin-top: 10px;
    text-align: center;
  }
  .user-informations .el-input {
    width: 250px;
  }
  .valid-btn {
    position: relative;
    bottom: 0;
  }
  @media screen and (max-width:830px) {
    .button div {
      flex-direction: column;
    }
  }
</style>