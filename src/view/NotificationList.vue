<template>
  <Navbar/>
    <h2>Centre de notification</h2>
  <div class="notification-container">
    <router-link
        v-for="notif in notificationList"
        :key="notif.id"
        :to="`/notifications/${notif.id}`"
        class="routing"
    >
      <NotificationItem :titre="notif.title" :sender="notif.sender" :texte="notif.message" :readed="notif.readed"/>
    </router-link>

  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import NotificationItem from "@/components/NotificationItem.vue";
import {getToken} from "@/router/middleware";
import axios from "axios";

export default {
  name: "NotificationList",
  components: {NotificationItem, Footer, Navbar},
  data(){
    return {
      userId: null,
      notificationList: []
    }
  },
  methods: {

  },
  mounted() {
    const token = getToken()
    axios.post("http://localhost:3000/token", token)
        .then((res) => {
          this.userId = res.data.token.id
          axios.get('http://localhost:3000/notifications', {
            params: {
              userId: this.userId
            }
          })
              .then((res) => {
                this.notificationList = res.data.response.rows
              })
              .catch((err) => {
                console.log(err)
              })
        })
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  .notification-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .routing {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
</style>