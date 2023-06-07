<template>
  <AdminNavBar/>
  <h2>Les annonces</h2>
  <div class="search">
    <div style="display: flex; flex-wrap: wrap; justify-content: center; width: auto">
      <el-input v-model="searchQuery" placeholder="Rechercher"></el-input>
      <el-checkbox v-model="filterState" style="margin-left: 10px" bg text>Les annonces à valider</el-checkbox>
    </div>
    <div class="search-btn">
      <el-button @click="previousPage" :disabled="currentPage === 1"><el-icon><Back /></el-icon></el-button>
      <p>page {{ currentPage }}</p>
      <el-button @click="nextPage" :disabled="currentPage === totalPages"><el-icon><Right /></el-icon></el-button>
    </div>
  </div>
  <div class="data-container">
    <el-table :data="itemsOnPage" class="dataTable">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="Titre" align="center"></el-table-column>
      <el-table-column prop="id_owner" label="Propriétaire" align="center"></el-table-column>
      <el-table-column prop="state" label="Propriétaire" align="center">
        <template #default="scope">
          <p v-if="scope.row.state === 0">Non validé</p>
          <p v-if="scope.row.state === 1">Validé</p>
          <p v-if="scope.row.state === -1">Supprimé</p>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center">
        <template #default="scope">
          <div style="display: flex; flex-wrap: wrap; justify-content: center">
              <el-button type="primary" @click="getCarDetails(scope.row.id)">
                {{scope.row.date}}
                <font-awesome-icon :icon="['fas', 'eye']" style="color: #ffffff;" />
              </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Footer/>
  <el-dialog v-model="showDialog" title="Information" width="30%" center :lock-scroll="false" @close="showDialog = false">
          <span style="text-align: center; display: flex; flex-direction: column; gap: 5px">
            <span>ID : {{carData.id}}</span>
            <span>Titre : {{carData.title}}</span>
            <span>Marque : {{carData.marque}}</span>
            <span>Modèle : {{carData.model}}</span>
            <span>Type : {{carData.type}}</span>
            <span v-if="carData.state === 0">Statut : Non validé</span>
            <span v-if="carData.state === 1">Statut : Validé</span>
            <span v-if="carData.state === -1">Statut : Supprimé</span>
            <span>État : {{carData.status}}</span>
            <span>Prix : {{carData.price}} €</span>
            <span>Kilométrage : {{carData.km}} km</span>

          </span>
    <template #footer>
      <div class="dialog-footer">
        <div class="checkbox-container">
          <el-checkbox v-model="enableButton" v-if="carData.state !== -1">Cocher pour activer les boutons</el-checkbox>
        </div>
        <div class="button-container">
          <el-button :disabled="!enableButton" v-if="carData.state === 0" @click="valideAnnonce(carData.id)">Valider</el-button>
          <el-button :disabled="!enableButton" v-if="carData.state === 1" @click="hideAnnonce(carData.id)">Cacher</el-button>
          <el-button :disabled="!enableButton" v-if="carData.state !== -1" @click="deleteAnnonce(carData.id)">Supprimer</el-button>
          <router-link :to="`/annonce/voiture/${carData.id}`" style="margin-left: 15px">
            <el-button v-if="carData.state !== -1">Voir</el-button>
          </router-link>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";
import {Back, Right} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "AdminAnnonce",
  components: {Right, Back, Footer, AdminNavBar},
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      items: [],
      filterState: false,
      carData: {},
      showDialog: false,
      enableButton: false
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const matchesSearchQuery = this.searchQuery === '' ||
            item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesFilterState = !this.filterState || item.state === 0;
        return matchesSearchQuery && matchesFilterState;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    itemsOnPage() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredItems.slice(startIndex, endIndex);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    getCarDetails(id){
      axios.post('http://localhost:3000/annonce', {idAnnonce: id})
          .then((res) => {
            this.carData = res.data.response.rows[0]
            this.showDialog = true
          })
          .catch((err) => {
            console.log(err)
          })
    },
    valideAnnonce(id){
      axios.post('http://localhost:3000/annonce/valideAnnonce', {id: id})
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: "success"
            })
            this.showDialog = false
            axios.post('http://localhost:3000/notifications/', {receiver: this.carData.id_owner, titre: "Validation d'annonce", texte: "Votre annonce portant le titre de '" + this.carData.title + "' a bien été validé par un administrateur."})
            this.$router.go()
          })
          .catch((err) => {
            console.log(err)
          })
    },
    hideAnnonce(id){
      axios.post('http://localhost:3000/annonce/hideAnnonce', {id: id})
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: "success"
            })
            this.showDialog = false
            axios.post('http://localhost:3000/notifications/', {receiver: this.carData.id_owner, titre: "Perte de statut", texte: "Votre annonce portant le titre de '" + this.carData.title + "' a été caché à la vue des autres par un administrateur."})

            this.$router.go()
          })
          .catch((err) => {
            console.log(err)
          })
    },
    deleteAnnonce(id){
      axios.get('http://localhost:3000/annonce/deleteAnnonce', {
        params: {
          id: id
        }
      })
          .then((res) => {
            ElMessage({
              showClose: true,
              message: res.data.message,
              type: "success"
            })
            this.showDialog = false
            axios.post('http://localhost:3000/notifications/', {receiver: this.carData.id_owner, titre: "Suppression d'annonce", texte: "Votre annonce portant le titre de '" + this.carData.title + "' a été supprimé par un administrateur."})
            this.$router.go()
          })
          .catch((err) => {
            console.log(err)
          })
    }
  },
  mounted() {
    axios.get('http://localhost:3000/annonce/getAllAnnonce')
        .then((res) => {
          this.items = res.data.response.rows
          this.items.sort((a, b) => a.id - b.id);
        })
        .catch((err) => {
          console.log(err)
        })
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
    font-size: 1.8rem;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .search-btn {
    display: flex;
    align-items: center;
  }
  .search-btn p {
    margin-left: 10px;
    margin-right: 10px;
  }
  .el-input {
    width: 300px;
  }
  .router {
    text-decoration: none;
  }
  .router .el-button {
    margin: 3px;
  }
  .data-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>