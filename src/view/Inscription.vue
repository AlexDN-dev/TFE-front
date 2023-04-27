<template>
  <Navbar/>
  <h2>Inscription</h2>
  <form>
    <div>
      <div class="container">
        <p>Nom*</p>
        <el-input v-model="userData.lastName"></el-input>
      </div>
      <div class="container">
        <p>Prénom*</p>
        <el-input v-model="userData.firstName"></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Adresse mail*</p>
        <el-input v-model="userData.mail" type="mail"></el-input>
      </div>
      <div class="container">
        <p>Répéter l'adresse*</p>
        <el-input v-model="confirmData.mail"></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Mot de passe*</p>
        <el-input v-model="userData.password" type="password"></el-input>
      </div>
      <div class="container">
        <p>Répéter le mot de passe*</p>
        <el-input v-model="confirmData.password" type="password"></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Âge</p>
        <el-date-picker style="width: 203px" v-model="userData.age" type="date" :disabled-date="disabledFutureDates"></el-date-picker>
      </div>
      <div class="container">
        <p>Numéro de téléphone</p>
        <el-input v-model="userData.phoneNumber"></el-input>
      </div>
    </div>
    <div>
      <div class="container">
        <p>Ville</p>
        <el-input v-model="userData.city"></el-input>
      </div>
      <div class="container">
        <p>Code postal</p>
        <el-input v-model="userData.postalCode"></el-input>
      </div>
    </div>
    <div class="sample-captcha">
      <p>Captcha</p>
      <div>
        <el-input style="width: 203px; height: 32px" type="text" v-model="inputValue" />
        <VueClientRecaptcha :value="inputValue" @isValid="checkValidCaptcha" style="margin-top: 5px"/>
      </div>
    </div>
    <el-button style="margin: 15px" type="success" :disabled="!inputsCompleted" @click="Inscription()">Inscription</el-button>
  </form>
  <h3>Pas encore de compte ? <router-link to="/connexion" class="router"><span>Inscrivez-vous</span></router-link> !</h3>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import VueClientRecaptcha from "vue-client-recaptcha";
import {ref} from "vue";
import axios from 'axios'
import {dayjs, ElMessage} from "element-plus";

export default {
  name: "Inscription",
  components: {Footer, Navbar, VueClientRecaptcha},
  data(){
    return {
      userData: {
        lastName: "",
        firstName: "",
        mail: "",
        password: "",
        age: null,
        city: null,
        postalCode: null,
        phoneNumber: null,
        picture: null,
        profilLevel: 0,
        permission: 0
      },
      confirmData: {
        mail: "",
        password: ""
      },
      enableButton: false,
      inputValue: ref(null),
      error: ""
    }
  },
  methods: {
    checkValidCaptcha(value){
      this.enableButton = value
    },
    Inscription() {
      axios.post('http://localhost:3000/users/register', this.userData)
        .then((res) => {
          ElMessage({
            showClose: true,
            message: res.data.message,
            type: "success"
          })
          this.$router.push('/connexion')
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
      if(this.userData.lastName !== "" && this.userData.firstName !== "" && this.userData.mail !== "" && this.userData.password !== "" && this.confirmData.mail !== "" && this.confirmData.password !== ""){
        if(this.userData.mail === this.confirmData.mail && this.userData.password === this.confirmData.password){
            if(this.userData.password.length >= 8){
              if(this.enableButton === true){
                return true
              } else {
                return false
              }
            } else {
              return false
            }
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  setup() {
    const date = ref(null);

    const disabledFutureDates = (time) => {
      const today = dayjs().startOf('day');
      const dateToCheck = dayjs(time).startOf('day');
      return dateToCheck.isAfter(today);
    };

    return { date, disabledFutureDates };
  },
}
</script>

<style scoped>
  h2, h3 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  form div {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .container{
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container p {
    margin: 0 0 5px;
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
  .sample-captcha {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .sample-captcha div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .sample-captcha p {
    text-align: center;
    margin: 5px;
  }
</style>