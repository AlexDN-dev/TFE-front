<template>
  <AdminNavBar/>
  <h2>Envoie de notification</h2>
  <el-form class="form">
    <div class="select">
      <el-select-v2 class="selector" v-model="receiver" filterable clearable :options="usersList" placeholder=" "/>
      <el-input class="selector" placeholder="Titre" v-model="titre"></el-input>
    </div>
    <div class="area-container">
      <textarea v-model="texte"/>
    </div>
    <el-form-item>
      <el-button type="primary" style="margin: 10px" @click="sendNotification">Envoyer</el-button>
    </el-form-item>
  </el-form>
  <Footer/>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "AdminNotification",
  components: {Footer, AdminNavBar},
  data(){
    return {
      usersList: [],
      receiver: "",
      texte: "",
      titre: ""
    }
  },
  methods:{
    sendNotification() {
      axios.post('http://localhost:3000/notifications/', {receiver: this.receiver, titre: this.titre, texte: this.texte})
          .then((res) => {
            this.receiver = ""
            this.texte = ""
            this.titre = ""
            ElMessage({
              showClose: true,
              type: "success",
              message: res.data.message
            })
          })
          .catch((err) => {
            console.log(err)
          })
    }
  },
  mounted() {
    axios.get('http://localhost:3000/users/')
        .then((res) => {
          res.data.rows.forEach(e => {
            this.usersList.push({
              label: e.firstName + " " + e.lastName,
              value: e.id
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .select {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .selector {
    width: 300px;
    margin: 10px;
  }
  .area-container {
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: center;
  }
  textarea {
    width: 95%;
    margin: 0;
    height: 300px;
    resize: none;
    border-radius: 5px;
  }
</style>