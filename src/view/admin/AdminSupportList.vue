<template>
  <AdminNavBar/>
  <h2>Support</h2>
  <h2>Les tickets</h2>
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
      <el-table-column prop="creator" label="Auteur" align="center"></el-table-column>
      <el-table-column prop="title" label="Titre" align="center"></el-table-column>
      <el-table-column prop="isClose" label="Statut" align="center">
        <template #default="scope">
          <p v-if="scope.row.isClose === 1" class="closed">Fermé</p>
          <p v-if="scope.row.isClose === 0" class="open">Ouvert</p>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center">
        <template #default="scope">
          <div>
            <router-link :to="'/admin/support/' + scope.row.id" class="router">
              <el-button type="primary">
                <p>{{scope.row.t}}</p>
                <font-awesome-icon icon="fa-solid fa-eye" style="color: #ffffff;" />
              </el-button>
            </router-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Footer/>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";
import {Back, Right} from "@element-plus/icons-vue";
import axios from "axios";
import {getToken} from "@/router/middleware";

export default {
  name: "AdminSupportList",
  components: {Right, Back, Footer, AdminNavBar},
  data() {
    return {
      idUser: null,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      items: []
    }
  },
  computed: {
    filteredItems() {
      if (this.searchQuery === '') {
        return this.items;
      } else {
        const lowerCaseSearchQuery = this.searchQuery.toLowerCase();
        return this.items.filter(item => {
          return item.creator.toLowerCase().includes(lowerCaseSearchQuery) ||
              item.title.toLowerCase().includes(lowerCaseSearchQuery);
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
    }
  },
  mounted() {
    const token = getToken()
    axios.post("http://localhost:3000/token", token)
        .then((res) => {
          this.idUser = res.data.token.id.toString();
          axios.get('http://localhost:3000/ticket/admin/getAllTickets', {
            params: {
              id: this.idUser
            }
          })
              .then((res) => {
                this.items = res.data.response.rows
              })
              .catch((err) => {
                console.log(err)
              })
        })
        .catch(() =>{
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