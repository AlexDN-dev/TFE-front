<template>
  <Navbar/>
  <div>
    <div class="informations-container">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="avatar"/>
      <div class="user-informations">
        <p>{{userData.firstname}} {{userData.lastname}}<span v-if="userData.age !== null">, {{userData.age}} ans</span></p>
        <div class="account-level">
          <el-tooltip :content="'Compte de niveau ' + userData.profilLevel">
            <font-awesome-icon icon="fa-solid fa-certificate" style="color: #c7c7c7;" size="2x"/>
          </el-tooltip>
        </div>
        <div class="like-container">
          <p>50,25%</p>
          <div v-if="!hisAccount" style="display: flex">
            <div class="btn like"><font-awesome-icon icon="fa-solid fa-thumbs-up" style="color: #3cc00c;" /></div>
            <div class="btn like"><font-awesome-icon icon="fa-solid fa-thumbs-down" style="color: #d31b1b;" /></div>
          </div>
        </div>
      </div>
      <div class="parameter-btn-container" v-if="hisAccount" >
        <router-link to="/upgrade">
          <div class="btn upgrade">
            <el-tooltip content="Améliorer mon compte">
              <font-awesome-icon icon="fa-solid fa-rocket" style="color: #857b00;" />
            </el-tooltip>
          </div>
        </router-link>
        <router-link to="/userSettings">
          <div class="btn param">
            <el-tooltip content="Paramètres du compte">
              <font-awesome-icon icon="fa-solid fa-gear" style="color: #c2c2c2;" />
            </el-tooltip>
          </div>
        </router-link>
      </div>
    </div>
    <h2>Les annonces de {{userData.firstname}}</h2>
    <div class="annonce-container">
      <div class="annonce">
        <AnnonceVoitureMini/>
        <div v-if="hisAccount"  class="annonce-btn">
          <el-tooltip content="Éditer" placement="right">
            <div class="btn edit">
              <font-awesome-icon icon="fa-solid fa-pen" style="color: #8a8a8a;" />
            </div>
          </el-tooltip>
          <el-tooltip content="Supprimer" placement="right">
            <div class="btn delete-account">
              <font-awesome-icon icon="fa-solid fa-trash" style="color: #ff2727;" />
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="annonce">
        <AnnonceVoitureMini/>
        <div v-if="hisAccount"  class="annonce-btn">
          <el-tooltip content="Éditer" placement="right">
            <div class="btn edit">
              <font-awesome-icon icon="fa-solid fa-pen" style="color: #8a8a8a;" />
            </div>
          </el-tooltip>
          <el-tooltip content="Supprimer" placement="right">
            <div class="btn delete-account">
              <font-awesome-icon icon="fa-solid fa-trash" style="color: #ff2727;" />
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="annonce">
        <AnnonceVoitureMini/>
        <div v-if="hisAccount"  class="annonce-btn">
          <el-tooltip content="Éditer" placement="right">
            <div class="btn edit">
              <font-awesome-icon icon="fa-solid fa-pen" style="color: #8a8a8a;" />
            </div>
          </el-tooltip>
          <el-tooltip content="Supprimer" placement="right">
            <div class="btn delete-account">
              <font-awesome-icon icon="fa-solid fa-trash" style="color: #ff2727;" />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnnonceVoitureMini from "@/components/AnnonceVoitureMini.vue";
import axios from "axios";
import {logout} from "@/router/middleware";

export default {
  name: "User",
  components: {AnnonceVoitureMini, Footer, Navbar},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userData: {
        id: this.id,
        firstname: "",
        lastname: "",
        age: null,
        profilLevel: null
      },
      hisAccount: false
    }
  },
  mounted() {
    axios.post('http://localhost:3000/users/data', this.userData.id)
        .then((res) => {
          this.userData.firstname = res.data.data.firstName
          this.userData.lastname = res.data.data.lastName
          this.userData.profilLevel = res.data.data.profilLevel
          if(res.data.data.age !== null){
            this.userData.age = this.calculateAge(res.data.data.age)
          }
          let token = window.sessionStorage.getItem('token')
          if(token === null){
            token = window.localStorage.getItem('token')
          }
          axios.post("http://localhost:3000/token", token)
              .then((res) => {
                if(this.id === res.data.token.id.toString()){
                  this.hisAccount = true
                }else {
                  this.hisAccount = false
                }
              })
              .catch(() =>{
                logout()
                this.$router.push('/connexion')
              })
        })
  },
  methods: {
    calculateAge(birthday) {
      const birthdate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      const month = today.getMonth() - birthdate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
      return age;
    }
  }
}
</script>

<style scoped>
  .informations-container {
    background-image: linear-gradient(to left bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px;
  }
  .user-informations {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .user-informations p {
    margin: 10px;
    font-size: 20px;
  }
  .avatar {
    margin: 10px;
    width: 125px;
    height: 125px;
  }
  .account-level {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  h2 {
    text-align: center;
  }
  .parameter-btn-container {
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .btn {
    border-radius: 10px;
    text-align: center;
    padding: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    cursor: pointer;
  }
  .param {
    background-color: gray;
  }
  .upgrade {
    background-color: #dcdc00;
  }
  .delete-account {
    background-color: #c21a1a;
  }
  .edit {
    background-color: #d9d9d9;
  }
  .like-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .like-container p {
    font-size: 20px;
  }
  .like-container .btn {
    width: 25px;
    height: 25px;
  }
  .like {
    background-color: rgb(240, 240, 240);
  }
  .annonce-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .annonce {
    display: flex;
    justify-content: center;
  }
  .annonce-btn {
    margin-left: 5px;
  }
  @media screen and (max-width: 500px) {
    .avatar {
      display: none;
    }
    .parameter-btn-container {
      bottom: 0;
    }
    .btn {
      width: 20px;
      height: 20px;
    }
  }
</style>