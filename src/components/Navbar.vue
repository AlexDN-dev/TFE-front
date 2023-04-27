<template>
  <div>
    <div class="user-navbar">
      <div style="display: flex; align-items: center">
        <h2>ElectroAuto</h2>
        <router-link to="/admin">
          <div class="admin-btn">
            <font-awesome-icon icon="fa-solid fa-toolbox" style="color: #8bc34a;" />
          </div>
        </router-link>
      </div>
      <div class="user-navbar-btn" v-if="!this.isConnected">
        <router-link to="/connexion"><el-button type="success" :icon="UserFilled" bg text circle size="large"/></router-link>
      </div>
      <div class="user-navbar-btn" v-if="this.isConnected">
        <router-link to="/user"><el-button type="success" :icon="UserFilled" bg text circle size="large"/></router-link>
        <router-link to="/notifications"><el-button type="success" :icon="BellFilled" bg text circle size="default" class="btn"/></router-link>
        <div style="background-color: white; width: 30px; height: 32px; border-radius: 25px; display: flex;justify-content: center; align-items: center; margin-left: 5px; cursor: pointer"><font-awesome-icon icon="fa-solid fa-right-from-bracket" style="color: #67C23A; margin: 0; width: 14px; height: 14px" class="btn"/></div>
      </div>
    </div>
    <div class="navbar">
      <router-link to="/"><a>Accueil</a></router-link>
      <router-link to="/recherche"><a>Rechercher</a></router-link>
      <router-link to="/createAnnonce"><a>Vendre</a></router-link>
      <router-link to="/support"><a>Support</a></router-link>
    </div>
  </div>
</template>

<script>
import {Sort, UserFilled} from "@element-plus/icons-vue";
import {BellFilled} from "@element-plus/icons-vue";

export default {
  name: "Navbar",
  computed: {
    Sort() {
      return Sort
    },
    BellFilled() {
      return BellFilled
    },
    UserFilled() {
      return UserFilled
    }
  },
  data() {
    return {
      isConnected: false
    }
  }
}
</script>

<style scoped>
  .user-navbar {
    background-image: linear-gradient(to left bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user-navbar h2 {
    margin: 0 0 0 15px;
  }
  .user-navbar-btn {
    margin: 15px;
    display: flex;
    align-items: center;
  }
  .btn {
    margin-left: 5px;
  }
  .user-navbar-btn a {
    color: #1B5E20;
    text-decoration: none;
  }
  .navbar {
    display: flex;
    width: 100%;
    justify-content: center;
    font-weight: 800;
    flex-wrap: wrap;
    background-color: rgb(245,245,245)
  }
  .navbar a{
    padding: 10px 7px;
    text-decoration: none;
    color: black;
  }
  .navbar a:hover {
    background-color: rgb(230,230,230);
  }
  .admin-btn {
    background-color: white;
    width: 35px;
    height: 35px;
    border-radius: 25px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  #alerte {
    display: flex;
    justify-content: center;
    margin: 10px 10px 0 10px;
  }
</style>