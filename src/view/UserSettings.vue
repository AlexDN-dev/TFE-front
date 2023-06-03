<template>
  <Navbar/>
  <h3>Ici, vous pouvez retrouver les informations personnelles lié à votre compte. Vous pouvez également les modifiers à votre guise.</h3>
  <p style="text-align: center">Photo de profil</p>
  <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="http://localhost:3000/users/addPicture"
      :auto-upload="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :list-type="'picture-card'"
      :default-file-list="fileList"
      :limit="15"
  >
    <el-icon class="avatar-uploader-icon">
      <Plus />
    </el-icon>
    <template v-slot:tip>
      <div class="el-upload__tip">Seulement des fichiers au format jpg/png avec une taille maximale de 2Mo</div>
    </template>
  </el-upload>
  <el-button class="btn" type="success" @click="uploadImages">Envoyer</el-button>
  <el-divider/>
  <form class="user-informations">
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
      <el-button @click="changePhoneNumber" :disabled="this.phoneNumber === ''">Valider</el-button>
    </div>
    <div class="button">
      <p>Informations personelles</p>
      <div>
        <el-input v-model="coords.city" :placeholder="userData.city"></el-input>
        <el-input v-model="coords.postalCode" :placeholder="userData.postalCode"></el-input>
      </div>
      <el-button @click="changeCoords" :disabled="this.coords.city === '' || this.coords.postalCode === ''">Valider</el-button>
    </div>
    <el-button type="danger" style="margin: 15px" @click="dialogBox = true">Supprimer mon compte</el-button>
    <el-dialog v-model="dialogBox" title="Attention" width="30%" center>
      <span>Voulez-vous vraiment supprimer votre compte ?</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteAccount">
          Oui
        </el-button>
        <el-button @click="dialogBox = false">Annuler</el-button>
      </span>
      </template>
    </el-dialog>
  </form>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import {getToken, hasToken, logout} from "@/router/middleware";
import {ElMessage} from "element-plus";
import axios from "axios";
import {Plus} from "@element-plus/icons-vue";
export default {
  name: "UserSettings",
  components: {Plus, Footer, Navbar},
  data() {
    return {
      fileList: [],
      dialogBox: false,
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
    handleUploadSuccess(response) {
      // Gérer la réponse du serveur en cas de succès
      console.log('Image envoyée avec succès', response);
    },
    beforeUpload(file) {
      // Prévisualisation de l'image avant l'envoi
      const reader = new FileReader();
      reader.onload = (e) => {
        file.url = e.target.result;
        file.uid = Date.now(); // Ajoute une clé unique à chaque fichier
        this.fileList.push(file);
        console.log("l'image est ajoutée !")
      };
      reader.readAsDataURL(file);
      return false; // Empêche l'envoi automatique du fichier
    },
    uploadImages() {
      if (this.fileList.length !== 0) {
        const file = this.fileList[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result.split(',')[1];
          axios.post('http://localhost:3000/users/addPicture', { image: base64Image, id: this.userData.id})
              .then((res) => {
                this.fileList = []
                ElMessage({
                  showClose: true,
                  message: res.data.message,
                  type: "success"
                })
              })
              .catch((error) => {
                ElMessage.error({
                  showClose: true,
                  message: error

                })
              });
        };
        reader.readAsDataURL(file.raw);
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
    },
    changePhoneNumber(){
      const phoneNumber = {
        phone: this.phoneNumber,
        id: this.userData.id
      }
      axios.post("http://www.localhost:3000/users/changePhoneNumber", phoneNumber)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: 'success'
            })
            this.phoneNumber = ""
            this.reloadData()
          }).catch((err) => {
        ElMessage.error({
          showClose: true,
          message: err.response.data.error
        })
      })
    },
    changeCoords(){
      this.coords = {...this.coords, id: this.userData.id}
      axios.post("http://www.localhost:3000/users/changeCoords", this.coords)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: 'success'
            })
            this.coords.postalCode = ""
            this.coords.city = ""
            this.reloadData()
          }).catch((err) => {
        ElMessage.error({
          showClose: true,
          message: err.response.data.error
        })
      })
    },
    deleteAccount(){
      this.dialogBox = false
      axios.post("http://www.localhost:3000/users/deleteAccount", this.userData.id)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: 'success'
            })
            logout()
            this.$router.push('/')
          }).catch((err) => {
        ElMessage.error({
          showClose: true,
          message: err
        })
      })
    },
    reloadData(){
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
          axios.post('http://localhost:3000/users/data', this.userData.id)
              .then((res) => {
                console.log(res)
                this.userData.phoneNumber = res.data.data.phoneNumber
                this.userData.city = res.data.data.city
                this.userData.postalCode = res.data.data.postalCode
              })
              .catch((err) =>{
                console.log(err)
                logout()
                this.$router.push('/connexion')
              })
        })
  }
}
</script>

<style scoped>
.el-overlay {
  max-width: 1000px;
}
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