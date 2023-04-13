<template>
  <Navbar/>
  <div class="Notification">
    <div class="header">
      <p class="title">Titre de la notification</p>
      <p>Envoyé par <span style="font-weight: bold">Administrateur</span></p>
      <p>le <span>13/04/2023</span></p>
      <el-button class="delete-btn" type="danger">Supprimer</el-button>
    </div>
    <div class="header content">
      <h3>Contenu de la notification</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas placerat turpis non leo ultrices, et sagittis mauris posuere. Aliquam gravida euismod ex, nec auctor elit. Curabitur sagittis sagittis massa eu bibendum. Morbi non scelerisque nisl, ac egestas velit. Nam non molestie justo. Quisque semper elit finibus, fringilla velit id, tempor libero. Quisque ut pulvinar lectus. Nulla at egestas urna, eget tristique leo. Suspendisse consectetur nulla sed nisi dictum euismod. Curabitur egestas purus metus, quis dictum augue aliquet ac.

        Pellentesque ac ligula sit amet elit porta fermentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus dolor orci, laoreet id dui ut, sodales luctus justo. Phasellus aliquam neque eget lacus consectetur consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor euismod vulputate. Vestibulum ac bibendum odio, a tempor ante. Nullam non dui magna. Nam scelerisque interdum erat, non facilisis odio tincidunt quis. Sed ultricies consectetur orci vel fermentum. Fusce nec viverra neque, nec interdum lorem.</p>
    </div>
  </div>
  <Footer class="footer"/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Notification",
  components: {Footer, Navbar}
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