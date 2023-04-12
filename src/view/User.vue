<template>
  <Navbar/>
  <div>
    <div class="informations-container">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="avatar"/>
      <div class="user-informations">
        <p>Alexandre De Nève, 21 ans</p>
        <div class="account-level">
          <el-tooltip content="Compte de niveau 1">
            <font-awesome-icon icon="fa-solid fa-certificate" style="color: #c7c7c7;" size="2x"/>
          </el-tooltip>
        </div>
        <div class="like-container">
          <p>50,25%</p>
          <div class="btn like"><font-awesome-icon icon="fa-solid fa-thumbs-up" style="color: #3cc00c;" /></div>
          <div class="btn like"><font-awesome-icon icon="fa-solid fa-thumbs-down" style="color: #d31b1b;" /></div>
        </div>
      </div>
      <div class="parameter-btn-container">
        <div class="btn param">
          <el-tooltip content="Paramètres du compte">
            <font-awesome-icon icon="fa-solid fa-gear" style="color: #c2c2c2;" />
          </el-tooltip>
        </div>
        <div class="btn delete-account">
          <el-tooltip content="Supprimer mon compte">
            <font-awesome-icon icon="fa-solid fa-trash" style="color: #ff2727;" />
          </el-tooltip>
        </div>
      </div>
    </div>
    <h2>Les annonces de Alexandre</h2>
    <div class="annonce-container">
      <div class="annonce">
        <AnnonceVoitureMini/>
        <div class="annonce-btn">
          <el-tooltip content="Éditer" placement="right">
            <div class="btn edit">
              <font-awesome-icon icon="fa-solid fa-pen" style="color: #8a8a8a;" />
            </div>
          </el-tooltip>
          <el-tooltip content="Supprimer" placement="right">
            <div class="btn delete-account">
              <font-awesome-icon icon="fa-solid fa-trash" style="color: #ff2727;" />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnnonceVoitureMini from "@/components/AnnonceVoitureMini.vue";

export default {
  name: "User",
  components: {AnnonceVoitureMini, Footer, Navbar}
}
</script>

<style scoped>
  .informations-container {
    background-image: linear-gradient(to left bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
    border-radius: 10px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .user-informations {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .user-informations p {
    margin: 10px;
    font-size: 20px;
  }
  .avatar {
    margin: 10px;
    width: 125px;
    height: 125px;
  }
  .account-level {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  h2 {
    text-align: center;
  }
  .parameter-btn-container {
    display: flex;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .btn {
    border-radius: 10px;
    text-align: center;
    padding: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    cursor: pointer;
  }
  .param {
    background-color: gray;
  }
  .delete-account {
    background-color: #c21a1a;
  }
  .edit {
    background-color: #d9d9d9;
  }
  .like-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .like-container p {
    font-size: 20px;
  }
  .like-container .btn {
    width: 25px;
    height: 25px;
  }
  .like {
    background-color: rgb(240, 240, 240);
  }
  .annonce-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .annonce {
    display: flex;
    justify-content: center;
  }
  .annonce-btn {
    margin-left: 5px;
  }
  @media screen and (max-width: 500px) {
    .avatar {
      display: none;
    }
    .parameter-btn-container {
      bottom: 0;
    }
    .btn {
      width: 20px;
      height: 20px;
    }
  }
</style>