<template>
  <Navbar/>
  <div class="Notification">
    <div class="header">
      <p class="title">{{ notification.title }}</p>
      <p>Envoyé par <span style="font-weight: bold">{{ notification.sender }}</span></p>
      <p>le <span>{{ formattedDate }}</span></p>
      <el-button class="delete-btn" type="danger" @click="dialogBox = true">Supprimer</el-button>
      <el-dialog v-model="dialogBox" title="Attention" width="30%" center>
        <span>Voulez-vous supprimer cette notification ?</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteNotification">
          Oui
        </el-button>
        <el-button @click="dialogBox = false">Non</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
    <div class="header content">
      <h3>Contenu de la notification</h3>
      <p>{{ notification.message }}</p>
    </div>
  </div>
  <Footer class="footer"/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // Importez le plugin utc de day.js
import timezone from 'dayjs/plugin/timezone'; // Importez le plugin timezone de day.js
import 'dayjs/locale/fr';
import {ElMessage} from "element-plus"; // Importez la localisation française de day.js si nécessaire

dayjs.extend(utc); // Étendez day.js avec le plugin utc
dayjs.extend(timezone); // Étendez day.js avec le plugin timezone

export default {
  name: "Notification",
  components: {Footer, Navbar},
  data(){
    return {
      notification: {},
      dialogBox: false
    }
  },
  methods: {
    deleteNotification(){
      axios.post('http://localhost:3000/notifications/delete', {notificationId: this.notification.id})
        .then((res) => {
          ElMessage({
            showClose: true,
            type: "success",
            message: res.data.message
          })
          this.$router.push('/notifications')
        })
          .catch((err) => {
            console.log(err)
          })
    }
  },
  mounted() {
    const id = this.$route.params.id;
    axios.get('http://localhost:3000/notifications/getNotification', {
      params: {
        id: id
      }
    })
        .then((res) => {
          this.notification = res.data.response.rows[0]
        })
        .catch((err) => {
          console.log(err)
        })
  },
  computed: {
    formattedDate() {
      return dayjs.utc(this.notification.date).format('DD-MM-YYYY HH:mm');
    },
  }
}
</script>

<style scoped>
  html {
  }
  .header {
    margin: 10px;
    background-color: rgb(220, 220, 220);
    padding: 10px;
    border-radius: 10px;
    position: relative;
  }
  .header p {
    margin: 5px 0;
  }
  .delete-btn {
    position: absolute;
    top: 5px;
    right: 10px;
  }
</style>