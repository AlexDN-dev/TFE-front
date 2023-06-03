<template>
  <Navbar/>
  <div class="ticket-information">
    <p>ID du ticket : #<span> {{ ticket.id }}</span></p>
    <p>Titre : <span> {{ ticket.title }}</span></p>
    <p>Statut :
      <span v-if="ticket.isClose === 0">Ouvert</span>
      <span v-if="ticket.isClose === 1">Fermé</span>
    </p>
    <p>Description : <span>{{ ticket.description }}</span></p>
    <div v-if="ticket.isClose !== 1">
      <el-button type="danger" @click="showDialog = true">Supprimer</el-button>
    </div>
  </div>
  <div class="conversation">
    <h2>Suivi du ticket</h2>
    <h3>{{ information }}</h3>
    <div class="conversation-container">
      <div class="container">
        <div :class="{'message': true, 'received': m.sender === 'Administrateur', 'sent': m.sender !== 'Administrateur'}" v-for="m in messageList" :key="m.id">
          <p>{{ m.message }}</p>
        </div>
      </div>
      <div class="form" v-if="!closedTicket">
        <textarea v-model="message"/>
        <div class="sendBtn" @click="sendMessage" :disabled="!canSendMessage">
          <font-awesome-icon icon="fa-solid fa-paper-plane" style="color: #ffffff;" />
        </div>
      </div>
    </div>
  </div>
  <h3 style="margin: 20px; text-align: center">Vous recevrez une notifications lorsqu'un administrateur répondra à votre ticket, les réponses arrivent en maximum 24 heures.</h3>
  <Footer/>
  <el-dialog v-model="showDialog" title="Warning" width="30%" center :lock-scroll="false" @close="showDialog = false">
          <span style="text-align: center; display: block">
            Voulez-vous vraiment fermer votre ticket ?
          </span>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="deleteTicket">Oui</el-button>
              <el-button @click="showDialog = false">Non</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {getToken, hasToken} from "@/router/middleware";
import {ElMessage} from "element-plus";

export default {
  name: "Support",
  components: {Footer, Navbar},
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      idTicket: this.id,
      idUser: null,
      ticket: {},
      message: "",
      messageList: [],
      canSendMessage: true,
      closedTicket: false,
      information: "Vous êtes limité à 3 messages consécutifs donc merci de les utiliser à bon escient.",
      showDialog: false
    }
  },
  methods: {
    sendMessage() {
      if(this.message !== ""){
        axios.post('http://localhost:3000/ticket/sendMessage', {
          sender: "Utilisateur",
          message: this.message,
          idTicket: this.idTicket
        })
            .then((res) => {
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: "success"
              })
              this.message = ""
              this.$router.go()
            })
            .catch((err) => {
              console.log(err)
            })
      }else {
        ElMessage.error({
          showClose: true,
          message: "Impossible d'envoyer un message vide.",
        })
      }
    },
    deleteTicket(){
      axios.post('http://localhost:3000/ticket/delete', {id: this.idTicket})
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: "success"
            })
            this.$router.push('/support')
          })
          .catch((err) => {
            console.log(err)
          })
    }
},
  mounted() {
    if(hasToken()){
      const token = getToken()
      axios.post("http://localhost:3000/token", token)
          .then((res) => {
            this.idUser = res.data.token.id.toString();
            axios.get('http://localhost:3000/ticket/getTicket', {
              params: {
                id: this.idTicket
              }
            })
                .then((res) => {
                  this.ticket = res.data.response.rows[0]
                  axios.get('http://localhost:3000/ticket/getMessage', {
                    params: {
                      id: this.idTicket
                    }
                  })
                      .then((res) => {
                        this.messageList = res.data.response.rows
                        let messageCount = 0
                        this.messageList.forEach((message) => {
                          if (message.sender === 'Utilisateur') {
                            messageCount += 1
                          } else {
                            messageCount = 0
                          }
                        })
                        if(messageCount === 3){
                          this.canSendMessage = false
                        }
                        console.log(this.ticket.isClose)
                        if(this.ticket.isClose === 1) {
                          this.closedTicket = true
                          this.information = "Le ticket a été fermé par vous ou un administrateur."
                        }
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
  },
}
</script>

<style scoped>
  .ticket-information {
    margin: 10px;
    padding: 10px;
    background-color: rgb(230, 230, 230);
    border-radius: 10px;
    position: relative;
  }
  .ticket-information p {
    margin: 5px;
  }
  .ticket-information div {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .conversation {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .conversation-container {
    position: relative;
    min-width: 583px;
  }
  .container {
    max-width: 600px;
    height: 400px;
    overflow-y: scroll;
    margin: 10px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .message {
    padding-right: 5px;
    padding-left: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    max-width: 50%;
    font-size: 0.9rem;
  }
  .message.sent {
    background-color: #ddd;
    align-self: flex-end;
  }
  .message.received {
    background-color: #8bc34a;
    align-self: flex-start;
  }
  .form {
    position: absolute;
    bottom: 13px;
    left: 10px;
    margin: auto;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .form textarea {
    resize: none;
    border-bottom-left-radius: 10px;
    width: 80%;
    height: 100%;
  }
  .sendBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 3px;
    border-radius: 5px;
    height: 100%;
    width: 40px;
    background-color: #8bc34a;
    cursor: pointer;
  }
  .last {
    margin-bottom: 30px;
  }
  textarea:focus {
    outline: none;
  }
</style>