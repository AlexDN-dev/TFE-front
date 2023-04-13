<template>
  <Navbar/>
    <h2>Centre de notification</h2>
  <div class="notification-container">
    <router-link to="/notifications/id" class="router"><NotificationItem/></router-link>
    <router-link to="/notifications/id" class="router"><NotificationItem/></router-link>
    <router-link to="/notifications/id" class="router"><NotificationItem/></router-link>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import NotificationItem from "@/components/NotificationItem.vue";

export default {
  name: "NotificationList",
  components: {NotificationItem, Footer, Navbar}
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
  .router {
    text-decoration: none;
    color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
</style>