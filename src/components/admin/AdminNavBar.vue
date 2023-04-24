<template>
  <div>
    <div class="navbar">
      <h2>Admin Dashboard</h2>
      <router-link to="/">
        <div class="disconnect">
          <font-awesome-icon icon="fa-solid fa-xmark" style="color: #000000;" />
        </div>
      </router-link>
    </div>
    <div class="navbar-btn">
      <router-link to="/admin" class="router">
        <p>Accueil</p>
      </router-link>
      <router-link to="/admin/annonce" class="router">
        <p>Les annonces</p>
      </router-link>
      <router-link to="/admin/support" class="router">
        <p>Le support</p>
      </router-link>
      <router-link to="/admin/user" class="router">
        <p>Les utilisateurs</p>
      </router-link>
      <router-link to="/admin/garage" class="router">
        <p>Les garages</p>
      </router-link>
      <router-link to="/admin/notification" class="router">
        <p>Messagerie</p>
      </router-link>
      <router-link to="/" class="router">
        <p>Paramètres</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminNavBar"
}
</script>

<style scoped>
  .navbar {
    background-image: linear-gradient(to left bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h2 {
    margin: 20px 0 20px 20px;
    font-size: 1.8rem;
  }
  .disconnect {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 25px;
    width: 30px;
    height: 30px;
    margin-right: 30px;
  }
  .navbar-btn {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: rgb(245,245,245)
  }
  .router {
    text-decoration: none;
    color: black;
    padding: 10px;
  }
  .navbar-btn p {
    margin: 0;
  }
  .navbar-btn .router:hover {
    background-color: rgb(230,230,230);
  }
</style>