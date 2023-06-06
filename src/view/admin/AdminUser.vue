<template>
  <AdminNavBar/>
  <h2>Les utilisateurs</h2>
  <div class="search">
    <el-input v-model="searchQuery" placeholder="Rechercher"></el-input>
    <div class="search-btn">
      <el-button @click="previousPage" :disabled="currentPage === 1"><el-icon><Back /></el-icon></el-button>
      <p>page {{ currentPage }}</p>
      <el-button @click="nextPage" :disabled="currentPage === totalPages"><el-icon><Right /></el-icon></el-button>
    </div>
  </div>
  <div class="data-container">
    <el-table :data="itemsOnPage" class="dataTable">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="mail" label="Mail" align="center"></el-table-column>
      <el-table-column prop="firstName" label="Prénom" align="center"></el-table-column>
      <el-table-column prop="lastName" label="Nom" align="center"></el-table-column>
      <el-table-column label="Statut" align="center">
        <template #default="scope">
          <p v-if="scope.row.permission === 0">Utilisateur</p>
          <p v-if="scope.row.permission === 10">Administrateur</p>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center">
        <template #default="scope">
          <div>
            <el-button type="primary" @click="getUserDetails(scope.row.id)">
              <p>{{ scope.row.t }}</p>
              <font-awesome-icon :icon="['fas', 'eye']" style="color: #ffffff;" />
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="showDialog" title="Information" width="30%" center :lock-scroll="false" @close="showDialog = false">
          <span style="text-align: center; display: flex; flex-direction: column; gap: 5px">
            <span>ID : {{userData.id}}</span>
            <span>Nom : {{userData.lastName}}</span>
            <span>Prénom : {{userData.firstName}}</span>
            <span>Mail : {{userData.mail}}</span>
            <span>Ville : {{userData.city}}</span>
            <span v-if="userData.permission === 0">Statut : Utilisateur</span>
            <span v-if="userData.permission === 10">Statut : Administrateur</span>
          </span>
    <template #footer>
      <div class="dialog-footer">
        <div class="checkbox-container">
          <el-checkbox v-model="enableButton">Cocher pour activer les boutons</el-checkbox>
        </div>
        <div class="button-container">
          <el-button v-if="userData.permission === 0" :disabled="!enableButton" @click="setAdmin(userData.id)">Passer administrateur</el-button>
          <el-button v-if="userData.permission === 10" :disabled="!enableButton" @click="setUser(userData.id)">Passer utilisateur</el-button>
          <el-button v-if="userData.profilLevel !== -1" :disabled="!enableButton" @click="banUser(userData.id)">Bannir</el-button>
          <el-button v-if="userData.profilLevel === -1" :disabled="!enableButton" @click="unbanUser(userData.id)">Débannir</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
  <Footer/>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";
import {Back, Right} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "AdminUser",
  components: {Right, Back, Footer, AdminNavBar},
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      items: [],
      userData: {},
      showDialog: false,
      enableButton: false
    }
  },
  computed: {
    filteredItems() {
      if (this.searchQuery === '') {
        return this.items;
      } else {
        const lowerCaseSearchQuery = this.searchQuery.toLowerCase();
        return this.items.filter(item => {
          return item.mail.toLowerCase().includes(lowerCaseSearchQuery) ||
              item.lastName.toLowerCase().includes(lowerCaseSearchQuery);
        });
      }
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    itemsOnPage() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredItems.slice(startIndex, endIndex);
    }
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
    getUserDetails(user){
      axios.post('http://localhost:3000/users/data', {userId: user})
          .then((res) => {
            this.userData = res.data.data
            this.showDialog = true
          })
          .catch((err) => {
            console.log(err)
          })
    },
    setAdmin(id){
      axios.post('http://localhost:3000/users/setAdmin', {userId: id})
          .then(() => {
            ElMessage({
              showClose: true,
              message: "L'utilisateur " + id + " est maintenant Administrateur.",
              type: "success"
            })
            this.showDialog = false
            this.$router.go('/')
          })
          .catch((err) => {
            console.log(err)
          })
    },
    setUser(id){
      axios.post('http://localhost:3000/users/setUser', {userId: id})
          .then(() => {
            ElMessage({
              showClose: true,
              message: "L'utilisateur " + id + " est maintenant un utilisateur.",
              type: "success"
            })
            this.showDialog = false
            this.$router.go('/')
          })
          .catch((err) => {
            console.log(err)
          })
    },
    banUser(id){
      axios.post('http://localhost:3000/users/banUser', {userId: id})
          .then(() => {
            ElMessage({
              showClose: true,
              message: "L'utilisateur " + id + " est maintenant banni.",
              type: "success"
            })
            this.showDialog = false
            this.$router.go('/')
          })
          .catch((err) => {
            console.log(err)
          })
    },
    unbanUser(id){
      axios.post('http://localhost:3000/users/unbanUser', {userId: id})
          .then(() => {
            ElMessage({
              showClose: true,
              message: "L'utilisateur " + id + " est maintenant débanni.",
              type: "success"
            })
            this.showDialog = false
            this.$router.go('/')
          })
          .catch((err) => {
            console.log(err)
          })
    }
  },
  mounted() {
    axios.get('http://localhost:3000/users')
        .then((res) => {
          this.items = res.data.rows
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
.checkbox-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.button-container {
  display: flex;
  justify-content: center;
}
</style>