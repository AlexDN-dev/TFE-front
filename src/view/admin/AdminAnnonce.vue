<template>
  <AdminNavBar/>
  <h2>Les annonces</h2>
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
      <el-table-column prop="title" label="Titre" align="center"></el-table-column>
      <el-table-column prop="owner" label="Propriétaire" align="center"></el-table-column>
      <el-table-column label="Validé" align="center">
          <template #default="scope">
            <p class="closed">{{scope.row.status}}</p>
          </template>
      </el-table-column>
      <el-table-column label="Action" align="center">
        <template #default="scope">
          <div style="display: flex; flex-wrap: wrap">
            <router-link to="/admin/annonce" class="router">
              <el-button type="primary">
                <font-awesome-icon :icon="['fas', 'eye']" style="color: #ffffff;" />
              </el-button>
            </router-link>
            <router-link to="/admin/annonce" class="router">
              <el-button type="info">
                <font-awesome-icon icon="fa-solid fa-repeat" style="color: #ffffff;" />
                {{scope.row.date}}</el-button>
            </router-link>
            <router-link to="/admin/annonce" class="router">
              <el-button type="danger">
                <font-awesome-icon icon="fa-solid fa-trash" style="color: #ffffff;" />
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

export default {
  name: "AdminAnnonce",
  components: {Right, Back, Footer, AdminNavBar},
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 15,
      items: [
        { id: 1, title: 'Element 1', status: 'Oui' ,owner: 'Owner 1' },
        { id: 2, title: 'Element 2', owner: 'Owner 2' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 4, title: 'Element 3', owner: 'Owner 3' },
        { id: 5, title: 'Element 3', owner: 'Owner 3' },
        { id: 6, title: 'Element 3', owner: 'Owner 3' },
        { id: 7, title: 'Element 3', owner: 'Owner 3' },
        { id: 8, title: 'Element 3', owner: 'Owner 3' },
        { id: 9, title: 'Element 3', owner: 'Owner 3' },
        { id: 10, title: 'Element 3', owner: 'Owner 3' },
        { id: 11, title: 'Element 3', owner: 'Owner 3' },
        { id: 12, title: 'Element 3', owner: 'Owner 3' },
        { id: 13, title: 'Element 3', owner: 'Owner 3' },
        { id: 14, title: 'Element 3', owner: 'Owner 3' },
        { id: 15, title: 'Element 3', owner: 'Owner 3' },
        { id: 16, title: 'Element 3', owner: 'Owner 3' },
        { id: 17, title: 'Element 3', owner: 'Owner 3' },
        { id: 18, title: 'Element 3', owner: 'Owner 3' },
        { id: 19, title: 'Element 3', owner: 'Owner 3' },
        { id: 20, title: 'Element 3', owner: 'Owner 3' },
        { id: 21, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 3, title: 'Element 3', owner: 'Owner 3' },
        { id: 40, title: 'Element 40', owner: 'Owner 40' },
        { id: 41, title: 'Element 40', owner: 'Owner 40' },
        { id: 42, title: 'Element 40', owner: 'Owner 40' },
        { id: 43, title: 'Element 40', owner: 'Owner 40' },
        { id: 44, title: 'Element 40', owner: 'Owner 40' },
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
          return item.title.toLowerCase().includes(lowerCaseSearchQuery) ||
              item.owner.toLowerCase().includes(lowerCaseSearchQuery);
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