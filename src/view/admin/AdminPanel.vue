<template>
  <AdminNavBar/>
  <h2>Les statistiques</h2>
  <div class="container">
    <div class="stat-container">
      <div class="stat-count">
        <div>
          <p>{{ stats.users }}</p>
          <font-awesome-icon icon="fa-solid fa-user" size="2x" style="color: #000000;" />
        </div>
        <h3>Utilisateurs</h3>
      </div>
    </div>
    <div class="stat-container">
      <div class="stat-count">
        <div>
          <p>{{ stats.annonce }}</p>
          <font-awesome-icon icon="fa-solid fa-car" size="2x" style="color: #000000;" />
        </div>
        <h3>Annonces</h3>
      </div>
    </div>
    <div class="stat-container">
      <div class="stat-count">
        <div>
          <p>{{stats.support}}</p>
          <font-awesome-icon icon="fa-solid fa-envelope" size="2x" style="color: #000000;" />
        </div>
        <h3>Ticket ouvert</h3>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from "@/components/Footer.vue";
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import axios from "axios";

export default {
  name: "AdminPanel",
  components: {AdminNavBar, Footer},
  data() {
    return {
      stats: {
        users: null,
        annonce: null,
        support: null
      }
    }
  },
  mounted() {
    axios.get('http://localhost:3000/options/stats')
        .then((res) => {
          this.stats.users = res.data.user
          this.stats.annonce = res.data.annonce
          this.stats.support = res.data.support
        })
        .catch((err) => {
          console.log(err)
        })
  },
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
  .stat-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
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
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  @media screen and (max-width: 399px) {
    .graphic {
      display: none;
    }
  }
</style>