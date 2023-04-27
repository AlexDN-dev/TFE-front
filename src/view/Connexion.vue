<template>
  <Navbar/>
  <h2 style="margin-top: 32px">Connexion</h2>
  <form class="form">
    <div>
      <p>Mail</p>
      <el-input v-model="userData.mail" type="mail"></el-input>
    </div>
    <div>
      <p>Mot de passe</p>
      <el-input v-model="userData.password" type="password"></el-input>
    </div>
    <el-checkbox label="Se souvenir de moi" v-model="rememberMe"></el-checkbox>
    <el-button style="margin: 15px" type="success" :disabled="inputsCompleted" @click="Connexion()">Connexion</el-button>
  </form>
  <h3 style="margin: 20px">Pas encore de compte ? <router-link to="/inscription" class="router"><span>Inscrivez-vous</span></router-link> !</h3>
  <h3>Mot de passe oublié ? Réinitialisé le <router-link to="/inscription" class="router"><span>ici</span></router-link>.</h3>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "Connexion",
  components: {Footer, Navbar},
  data(){
    return {
      userData: {
        mail: "",
        password: ""
      },
      rememberMe: false
    }
  },
  methods: {
    Connexion(){
      axios.post('http://localhost:3000/users/', this.userData)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: "success"
            })
            if(this.rememberMe === false){
              sessionStorage.setItem('token', res.data.token)
            }else if(this.rememberMe === true) {
              localStorage.setItem('token', res.data.token)
            }
            this.$router.push("/")
          })
          .catch((error) => {
            ElMessage.error({
              showClose: true,
              message: error.response.data.error
            })
          })
    }
  },
  computed: {
    inputsCompleted() {
      return this.userData.mail === "" || this.userData.password === "";
    }
  },
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  h3 {
    text-align: center;
    font-size: 1rem;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .connexion {
    background-color: #8bc34a;
    color: white;
    border-radius: 10px;
    margin: 20px;
    cursor: pointer;
  }
  .connexion p {
    margin: 0;
    padding: 10px 10px;
  }
  .router {
    text-decoration: none;
    color: #8bc34a;
  }
</style>