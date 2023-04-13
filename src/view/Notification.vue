<template>
  <Navbar/>
  <Footer/>
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

</style>