<template>
  <AdminNavBar/>
  <h2>Les statistiques</h2>
  <div class="stat-container">
    <div class="stat-count">
      <div>
        <p>450</p>
        <font-awesome-icon icon="fa-solid fa-user" size="2x" style="color: #000000;" />
      </div>
      <h3>Utilisateurs</h3>
    </div>
    <div class="graphic"></div>
  </div>
  <Footer/>
</template>

<script>
import Footer from "@/components/Footer.vue";
import AdminNavBar from "@/components/admin/AdminNavBar.vue";

export default {
  name: "AdminPanel",
  components: {AdminNavBar, Footer}
}
</script>

<style scoped>
  h2 {
    text-align: center;
    font-size: 1.7rem;
  }
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  .stat-count {
    display: flex;
    align-items: center;
    border: 4px solid #8bc34a;
    width: 320px;
    height: 200px;
    margin: 10px;
    border-radius: 15px;
    justify-content: center;
    flex-direction: column;
  }
  .stat-count div {
    display: flex;
    align-items: center;
  }
  .stat-count p {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 10px;
    position: relative;
  }
</style>