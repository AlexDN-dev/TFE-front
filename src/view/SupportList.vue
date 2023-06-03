<template>
  <Navbar/>
  <h2>Support</h2>
  <h3>Un problème avec votre compte ou notre site ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus bref délais.</h3>
  <h2>Ouvrir un ticket</h2>
  <div class="ticket">
    <div>
      <p>Nom et prénom</p>
      <el-input v-model="ticket.creator"></el-input>
    </div>
    <div>
      <p>Titre</p>
      <el-input v-model="ticket.title"></el-input>
    </div>
    <div style="width: 100%">
      <p>Expliquer votre problème</p>
      <textarea v-model="ticket.description"></textarea>
    </div>
    <el-button style="margin: 10px" @click="createTicket">Envoyer</el-button>
  </div>
  <el-divider/>
  <h2>Vos tickets</h2>
  <div class="ticket-container">
    <div class="tickets">
      <el-table :data="dataTable" style="min-width: 320px; max-width: 700px" height="350">
        <el-table-column prop="title" label="Titre" align="center"/>
        <el-table-column prop="isClose" label="Statut" align="center" width="110px">

          <template #default="scope">
            <p v-if="scope.row.isClose === 1" class="closed">Fermé</p>
            <p v-if="scope.row.isClose === 0" class="open">Ouvert</p>
          </template>
        </el-table-column>
        <el-table-column label="Action" align="center">
          <template #default="scope">
            <router-link :to="'/support/' + scope.row.id" class="router">
              <el-button type="info" plain>Ouvrir</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import {getToken, hasToken} from "@/router/middleware";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "SupportList",
  components: {Footer, Navbar},
  data(){
    return {
      idUser: null,
      ticket: {
        title: "",
        creator: "",
        description: ""
      },
      dataTable: []
    }
  },
  methods: {
    createTicket(){
      if(this.ticket.creator === "" || this.ticket.title === "" || this.ticket.description === ""){
        ElMessage.error({
          showClose: true,
          message: "Merci de remplir tous les champs !"
        })
      }else {
        axios.post('http://localhost:3000/ticket', {ticket: this.ticket, idUser: this.idUser})
            .then((res) => {
              ElMessage({
                showClose: true,
                type: "success",
                message: res.data.message
              })
              this.ticket.creator = ""
              this.ticket.description = ""
              this.ticket.title = ""
            })
            .catch((err) => {
              console.log(err)
            })
      }
    }
  },
  mounted() {
    if(hasToken()){
      const token = getToken()
      axios.post("http://localhost:3000/token", token)
          .then((res) => {
            this.idUser = res.data.token.id.toString();
            axios.post('http://localhost:3000/users/data', {userId: this.idUser})
                .then((res) => {
                  this.ticket.creator = res.data.data.firstName + " " + res.data.data.lastName
                  axios.get('http://localhost:3000/ticket', {
                    params: {
                      id: this.idUser
                    }
                  })
                      .then((res) => {
                        this.dataTable = res.data.response.rows
                        console.log(this.dataTable)
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                })
                .catch((err) => {
                  console.log(err)
                })
          })
          .catch(() =>{
          })
    }
  }
}
</script>

<style scoped>
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.15rem;
    font-weight: 600;
  }
  h2, h3 {
    text-align: center;
  }
  .ticket {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  .ticket div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  textarea {
    resize: none;
    border: 1px solid rgb(220,220,220);
    border-radius: 5px;
    width: 50%;
    margin-bottom: 10px;
    height: 100px;
  }
  textarea:focus {
    outline: none !important;
  }
  .tickets {
    display: flex;
    justify-content: center;
  }
  .tickets p {
    margin: 5px;
  }
  .open {
    background-color: #F0F9EB;
    color: #67C23A;
    border: 2px solid #B3E19D;
    border-radius: 7px;
  }
  .closed {
    background-color: #FEF0F0;
    color: #F56C6C;
    border: 2px solid #FAB6B6;
    border-radius: 7px;
  }
  .router {
    color: white;
    text-decoration: none;
  }
</style>