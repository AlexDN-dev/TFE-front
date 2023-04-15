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
      <el-table-column prop="name" label="Nom" align="center"></el-table-column>
      <el-table-column label="Statut" align="center">
        <template #default="scope">
          <p class="closed">{{scope.row.status}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center">
        <template #default="scope">
          <div>
            <el-button type="primary">
              <p>{{ scope.row.t }}</p>
              <font-awesome-icon :icon="['fas', 'eye']" style="color: #ffffff;" />
            </el-button>
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

export default {
  name: "AdminUser",
  components: {Right, Back, Footer, AdminNavBar},
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      items: [
        { id: 1, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 2, mail: 'benoit@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 3, mail: 'mirko@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 4, mail: 'anthony@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 5, mail: 'colleen@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 6, mail: 'mathieu@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 7, mail: 'jacques@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 8, mail: 'arthur@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 9, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 10, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 11, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 12, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 13, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 14, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 15, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 16, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 17, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
        { id: 18, mail: 'alexdeneve@hotmail.be', name: 'De Nève Alexandre' ,status: 'Actif' },
      ]
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
              item.name.toLowerCase().includes(lowerCaseSearchQuery);
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