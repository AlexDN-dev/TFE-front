<template>
  <Navbar/>
  <div class="header">
    <div class="carousel">
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="(item, index) in items" :key="index">
          <img :src="item.src" alt="image">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="seller-informations-container">
      <div class="btn_alert">
        <a href="#"><font-awesome-icon icon="fa-solid fa-triangle-exclamation" size="lg" style="color: #ff0000;" /></a>
      </div>
      <div class="avatar-container">
        <el-avatar :src="avatar" class="avatar"/>
      </div>
      <div class="seller-informations">
        <p class="name">{{ user.firstName }} {{ user.lastName }}</p>
        <div style="display: flex; align-items: center; margin: 0">
          <font-awesome-icon icon="fa-solid fa-location-dot" size="lg" style="color: #000000;" />
          <p>{{ user.city }}</p>
        </div>
        <p>tel: <span style="letter-spacing: 1px">{{ user.phoneNumber }}</span></p>
        <el-button class="btn" type="success" @click="copyAddress" text bg>Contacter le vendeur</el-button>
        <router-link :to="/user/ + user.id"><el-button class="btn" type="success" text bg>Voir ses annonces</el-button></router-link>
      </div>
    </div>
  </div>
  <div class="main-informations">
    <h3>Informations principales</h3>
    <div class="info">
      <div class="informations-container">
        <p style="font-weight: bold">Kilométrage</p>
        <p>{{ data.km }} km</p>
      </div>
      <div class="informations-container">
        <p style="font-weight: bold">Année de production</p>
        <p>{{ data.annee }}</p>
      </div>
      <div class="informations-container">
        <p style="font-weight: bold">Puissance</p>
        <p>{{ data.puissance }} kW {{ parseInt(data.puissance * 1.36).toFixed(0) }} (CH)</p>
      </div>
      <div class="informations-container">
        <p style="font-weight: bold">Autonomie</p>
        <p>{{ data.autonomie }} Km</p>
      </div>
    </div>
  </div>
  <el-divider/>
  <div>
      <h3>Informations supplémentaires</h3>
    <div class="secondary-informations-container">
      <div class="secondary-informations">
        <div>
          <p>Nombre de propriétaire(s) précédent(s) : </p><span>{{ data.numOwner }}</span>
        </div>
        <div>
          <p>Nombre de portes :</p><span>{{ data.numDoors }}</span>
        </div>
        <div>
          <p>Type de véhicule : </p><span>{{ data.type }}</span>
        </div>
        <p>Liste d'équipement :</p>
        <ul>
          <li v-for="item in getEquipmentList()" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="description-container">
        <p>Description du vendeur</p>
        <p>{{ data.desc }}</p>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "AnnonceVoiture",
  components: {Footer, Navbar},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      idAnnonce: this.id,
      items: [],
      data: {},
      equipment: '',
      idOwner: '',
      user: {},
      avatar: null
    }
  },
  methods: {
    getEquipmentList() {
      return this.equipment.split(",");
    },
    copyAddress(){
      navigator.clipboard.writeText(this.user.mail)
          .then(() => {
            ElMessage({
              showClose: true,
              message: "Adresse mail du vendeur copié !",
              type: "success"
            })
          })
          .catch((erreur) => {
            console.error("Erreur lors de la copie du texte :", erreur);
          });
    }
  },
  async mounted() {
    await axios.post("http://localhost:3000/annonce", {idAnnonce: this.idAnnonce})
        .then((res) => {
          const count = res.data.count
          this.data = res.data.response.rows[0]
          this.equipment = this.data.equipment
          this.idOwner = this.data.id_owner
          for (let i = 0; i < count; i++) {
            this.items.push({
              src: "http://localhost:3000/getImages/" + this.idAnnonce + "/" + i + ".jpg"
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    axios.post("http://localhost:3000/users/data", {userId: this.idOwner})
        .then((res) => {
          this.user = res.data.data
          axios.get('http://localhost:3000/users/getPicture', {
            params: {
              userId: this.user.id
            }
          })
              .then((res) => {
                this.avatar = res.data.message
              })
              .catch((err) => {
                console.log(err)
              })
        })
        .catch((err) => {
          console.log(err)
        })
  }
}
</script>

<style scoped>
  .header {
    display: flex;
  }
  .carousel {
    width: 100%;
    margin: 10px;
  }
  .carousel img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
  }
  .seller-informations-container {
    position: relative;
    background-image: linear-gradient(to right bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
    width: 40%;
    height: 300px;
    border-radius: 5px;
    margin: 10px;
  }
  .seller-informations {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .seller-informations .name {
    margin-top: 25px;
    font-weight: bold;
  }
  .seller-informations p {
    margin: 5px;
  }
  .avatar-container {
    display: flex;
    justify-content: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    margin-top: 10px;
  }
  .btn {
    margin: 10px;
    color: black;
  }
  .btn_alert {
    position: absolute;
    right: 15px;
    top: 15px;
  }
  h3 {
    margin-left: 10px;
    font-size: 1.5rem;
  }
  .info {
    display: flex;
    justify-content: space-evenly;
  }
  .informations-container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .informations-container p {
    margin: 5px;
  }
  .secondary-informations-container {
    display: flex;
    justify-content: space-between;
  }
  .secondary-informations {
    margin-left: 10px;
  }
  .secondary-informations div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .secondary-informations div span {
    position: relative;
    margin-left: 5px;
    top: 1px;
    font-weight: bold;
  }
  .secondary-informations li {
    margin: 2px;
  }
  .description-container {
    width: 450px;
  }
  .description-container p:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
  @media screen and (max-width:1024px) {
    .header {
      flex-direction: column;
      align-items: center;
    }
    .seller-informations-container {
      width: 80%;
      margin: 0;
    }
    .info {
      flex-wrap: wrap;
    }
    .secondary-informations-container {
      flex-wrap: wrap;
    }
    .description-container {
      margin: 10px;
    }
  }
  @media screen and (max-width: 426px) {
    .info {
      flex-direction: column;
    }
  }
</style>