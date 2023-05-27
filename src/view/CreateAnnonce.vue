<template>
  <Navbar/>
  <h2 v-if="mode === 'create'">Voici un formulaire pour pouvoir ajouter votre annonce à notre site</h2>
  <h3 v-if="mode === 'create'">Chaque annonce est sujette à une inspection par un administrateur de la plateforme avant la mise en ligne. Vous recevrez une notification quand l'annonce aura été accepté ou non.</h3>
  <el-divider v-if="mode === 'create'"/>
  <p class="title">Les photos de votre annonce <span style="font-size: 0.8rem">(minimum 1 photo)</span></p>
  <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="http://localhost:3000/annonce/create"
      multiple
      :auto-upload="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUpload"
      :on-preview="handlePreview"
      :list-type="'picture-card'"
      :default-file-list="fileList"
      :limit="15"
      @change="handleFileChange"
  >
    <el-icon class="avatar-uploader-icon">
      <Plus />
    </el-icon>
    <template v-slot:tip>
      <div class="el-upload__tip">Seulement des fichiers au format jpg/png avec une taille maximale de 2Mo</div>
    </template>
  </el-upload>

  <div class="annonce-title">
    <p class="title">Titre de l'annonce*</p>
    <el-input v-model="carInformation.titre" style="width: 300px"></el-input>
  </div>
  <form class="car-informations">
    <div>
      <p class="title">La marque*</p>
      <el-select v-model="carInformation.marque" placeholder="Marque" filterable>
        <el-option v-for="(marque, index) in listMarque" :key="index" :label="marque.marque" :value="marque.marque"></el-option>
      </el-select>
    </div>
    <div>
      <p class="title">Le modèle*</p>
      <el-select v-model="carInformation.modele" placeholder="Sélectionnez un modèle">
        <el-option v-for="(modele, index) in modelOptions" :key="index" :label="modele" :value="modele"/>
      </el-select>
    </div>
    <div>
      <p class="title">Le type*</p>
      <el-select class="input" v-model="carInformation.type" placeholder=" ">
        <el-option label="Citadine" value="Citadine"/>
        <el-option label="SUV" value="SUV"/>
        <el-option label="Berline" value="Berline"/>
        <el-option label="Coupé" value="Coupé"/>
        <el-option label="Utilitaire" value="Utilitaire"/>
      </el-select>
    </div>
    <div>
      <p class="title">Le kilométrage*</p>
      <el-input type="number" class="input" v-model="carInformation.km"/>
    </div>
    <div>
      <p class="title">Le prix*</p>
      <el-input type="number" class="input" v-model="carInformation.price"/>
    </div>
    <div>
      <p class="title">Puissance*</p>
      <el-input type="number" class="input" v-model="carInformation.puissance" placeholder="en kW"/>
    </div>
    <div>
      <p class="title">Autonomie*</p>
      <el-input type="number" class="input" v-model="carInformation.autonomie"/>
    </div>
    <div>
      <p class="title">L'année de production*</p>
      <el-input class="input" v-model="carInformation.annee"/>
    </div>
    <div>
      <p class="title">Le nombre de propriétaire*</p>
      <el-input class="input" v-model="carInformation.numOwner"/>
    </div>
    <div>
      <p class="title">État du véhicule*</p>
      <el-select v-model="carInformation.state" class="m-2" placeholder="État">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </div>
  </form>
  <el-divider/>
  <h2>Élement non obligatoire</h2>
  <div class="car-informations-secondary">
    <div>
      <p class="title">Description du véhicule</p>
      <textarea class="car-description" v-model="carInformation.desc"/>
    </div>
    <div>
      <p class="title">Liste d'équipement</p>
      <textarea class="car-description" v-model="carInformation.equipment" placeholder="Merci de séparer vos équipement par une virgule entre chaque."/>
    </div>
  </div>
  <div class="car-informations">
    <div>
      <p class="title">La couleur</p>
      <el-input class="input" v-model="carInformation.color"/>
    </div>
    <div>
      <p class="title">Le nombre de portes</p>
      <el-input class="input" v-model="carInformation.numDoors"/>
    </div>
  </div>
  <div style="width: 100%; display: flex; justify-content: center">
    <el-button :disabled="this.carInformation.titre === '' || this.carInformation.marque === '' || this.carInformation.modele === '' || this.carInformation.type === '' || this.carInformation.km === '' || this.carInformation.price === '' || this.carInformation.numOwner === '' || this.carInformation.state === ''" class="btn" type="success" @click="uploadImages('http://localhost:3000/annonce/create')" v-if="mode === 'create'">Envoyer</el-button>
    <el-button :disabled="this.carInformation.titre === '' || this.carInformation.marque === '' || this.carInformation.modele === '' || this.carInformation.type === '' || this.carInformation.km === '' || this.carInformation.price === '' || this.carInformation.numOwner === '' || this.carInformation.state === ''" class="btn" type="success" @click="uploadImages('http://localhost:3000/annonce/modify')">Modifier</el-button>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios"
import {getToken, hasToken} from "@/router/middleware";
import {ElMessage} from "element-plus";
import {Plus} from "@element-plus/icons-vue";

export default {
  name: "CreateAnnonce",
  components: {Plus, Footer, Navbar},
  data() {
    return {
      mode: "modify",
      fileList: [],
      carInformation: {
        titre: "",
        marque: "",
        modele: "",
        type: "",
        km: "",
        price: "",
        numOwner: "",
        state: "",
        desc: "",
        equipment: "",
        color: "",
        numDoors: "",
        annee: "",
        puissance: "",
        autonomie: ""
      },
      options: [
        {
          value: "Très bon état",
          label: "Très bon état"
        },
        {
          value: "Bon état",
          label: "Bon état"
        },
        {
          value: "Usagé",
          label: "Usagé"
        },
        {
          value: "Endommagé",
          label: "Endommagé"
        },
        {
          value: "Pour pièce",
          label: "Pour pièce"
        },
      ],
      listMarque: [],
      modelOptions: [],
      userId: null,
      carData : {},
      activeWatcher: false,
      annonceId: null,
      dialog: {

      }
    };
  },
  watch: {
    'carInformation.marque': {
      handler(newMarque) {
          if (newMarque) {
            this.fetchModelOptions(newMarque);
          } else {
            this.modelOptions = []; // Réinitialiser les options de modèle si la marque est vide
            this.carInformation.modele = ""
          }
        this.activeWatcher = true
      },
    },
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
    fetchImagesFromServer() {
      axios.get('http://localhost:3000/annonce/getImages', { // Ajoutez une parenthèse fermante après l'URL
        params: {
          id: this.annonceId
        }
      })
          .then(response => {
            // Récupérer les données de réponse contenant les images du serveur
            const imagesFromServer = response.data;

            // Ajouter chaque image à la liste fileList
            imagesFromServer.forEach(image => {
              this.fileList.push({
                name: image.fileName,
                url: image.imageUrl,
                status: 'ready',
              });
            });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des images du serveur', error);
          });
    },
    handleFileChange(file, fileList) {
      // File contient les détails du fichier ajouté
      console.log('Fichier ajouté :', file);

      // FileList contient tous les fichiers actuels de la liste
      console.log('Liste de fichiers actuelle :', fileList);
    },
    uploadImages(url) {
      if(this.fileList.length !== 0){
        const formData = new FormData();
        this.fileList.forEach((file) => {
          formData.append('images', file.raw);
        });
        formData.append('titre', this.carInformation.titre)
        formData.append('marque', this.carInformation.marque);
        formData.append('modele', this.carInformation.modele);
        formData.append('type', this.carInformation.type);
        formData.append('km', this.carInformation.km);
        formData.append('price', this.carInformation.price);
        formData.append('numOwner', this.carInformation.numOwner);
        formData.append('state', this.carInformation.state);
        formData.append('desc', this.carInformation.desc);
        formData.append('equipment', this.carInformation.equipment);
        formData.append('color', this.carInformation.color);
        formData.append('numDoors', this.carInformation.numDoors);
        formData.append('annee', this.carInformation.annee)
        formData.append('puissance', this.carInformation.puissance)
        formData.append('autonomie', this.carInformation.autonomie)
        formData.append('userId', this.userId)
        formData.append('annonceId', this.annonceId)
        axios.post(url, formData)
            .then((res) => {
              this.fileList = []
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: "success"
              })
              this.$router.push('/')
            })
            .catch((error) => {
              ElMessage.error({
                showClose: true,
                message: error.response.data.err
              })
            });
      }else {
        ElMessage.error({
          showClose: true,
          message: "Impossible de créer l'annonce, veuillez remplir tout les champs obligatoire !"
        })
      }
    },
    fetchModelOptions(marque) {
      if(this.activeWatcher === true){
        this.carInformation.modele = ""
        axios.get(`http://localhost:3000/options/getModele?marque=${marque}`)
            .then((response) => {
              this.modelOptions = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
      }
    },
  },
  async mounted() {
    if (!hasToken()) {
      this.$router.push('/connexion')
      ElMessage.error({
        message: "Vous n'êtes pas connecté ou votre session à expiré.",
        showClose: true
      })
    }
    const token = getToken()
    axios.post("http://localhost:3000/token", token)
        .then((res) => {
          this.userId = res.data.token.id
        })
    axios.get("http://localhost:3000/options/getMarque")
        .then((res) => {
          this.listMarque = res.data
        })
    const path = this.$route.path;
    if (path.includes('modifyAnnonce')) {
      this.mode = "modify"
      const param = {
        idAnnonce: this.$route.params.id,
        idUser: this.$route.params.idUser
      }
      axios.post('http://localhost:3000/users/checkAnnonce', param)
          .catch(() => {
            ElMessage.error({
              message: "Vous ne pouvez pas modifier cette annonce !",
              showClose: true
            })
            this.$router.push("/")
          })
      this.annonceId = this.$route.params.id
      await axios.post("http://localhost:3000/annonce", {idAnnonce: this.$route.params.id})
          .then(async (res) => {
            this.carData = res.data.response.rows[0]
            this.carInformation.titre = this.carData.title
            this.carInformation.marque = this.carData.marque
            this.carInformation.type = this.carData.type
            this.carInformation.km = this.carData.km
            this.carInformation.price = this.carData.price
            this.carInformation.puissance = this.carData.puissance
            this.carInformation.autonomie = this.carData.autonomie
            this.carInformation.annee = this.carData.annee
            this.carInformation.numOwner = this.carData.numOwner
            this.carInformation.state = this.carData.state
            this.carInformation.desc = this.carData.desc
            this.carInformation.equipment = this.carData.equipment
            this.carInformation.color = this.carData.color
            this.carInformation.numDoors = this.carData.numDoors
            this.carInformation.modele = this.carData.model
            this.fetchImagesFromServer();
          })
    } else {
      this.mode = "create"
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
  .annonce-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>