<template>
  <AdminNavBar/>
  <h2>Ajouter un garage</h2>
  <form class="form">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
      <el-input class="selector" placeholder="Nom du garage"/>
      <el-select-v2 class="selector" v-model="receiver" filterable clearable :options="selectMarque" placeholder="Sélectionner un gérant"/>
    </div>
    <el-button style="margin: 15px">Ajouter</el-button>
  </form>
  <h2>Rechercher un garage</h2>
  <div>
    <div class="search">
      <el-input class="selector" v-model="searchQuery" placeholder="Rechercher"></el-input>
      <div class="search-btn">
        <el-button @click="previousPage" :disabled="currentPage === 1"><el-icon><Back /></el-icon></el-button>
        <p>page {{ currentPage }}</p>
        <el-button @click="nextPage" :disabled="currentPage === totalPages"><el-icon><Right /></el-icon></el-button>
      </div>
    </div>
    <div class="data-container">
      <el-table :data="itemsOnPage" class="dataTable">
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="name" label="Nom" align="center"></el-table-column>
        <el-table-column prop="owner" label="Gérant" align="center"></el-table-column>
        <el-table-column label="Action" align="center">
          <template #default="scope">
            <div style="display: flex; flex-wrap: wrap; justify-content: center">
              <router-link to="/admin/annonce" class="router">
                <el-button type="primary">
                  <font-awesome-icon :icon="['fas', 'eye']" style="color: #ffffff;" />
                </el-button>
              </router-link>
              <router-link to="/admin/annonce" class="router">
                <el-button type="info">
                  <font-awesome-icon icon="fa-solid fa-pen" style="color: #ffffff;" />
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
  </div>
  <Footer/>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";
import {Back, Right} from "@element-plus/icons-vue";

export default {
  name: "AdminGarage",
  components: {Right, Back, Footer, AdminNavBar},
  data(){
    return {
      selectMarque: [
        {label: "label1", value: "value1"},
        {label: "label2", value: "value2"},
        {label: "label3", value: "value3"},
        {label: "label4", value: "value4"},
        {label: "label5", value: "value5"},
      ],
      receiver: null,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      items: [
        { id: 1, name: 'Test garage', owner : 'De Nève Alexandre' },
        { id: 2, name: 'Autosur', owner: 'Derenne Arthur' },
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
          return item.owner.toLowerCase().includes(lowerCaseSearchQuery) ||
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
  }
  .selector {
    width: 300px;
    margin: 10px;
  }
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .router {
    text-decoration: none;
  }
  .router .el-button {
    margin: 3px;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .search-btn {
    display: flex;
    align-items: center;
  }
  .search-btn p {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>