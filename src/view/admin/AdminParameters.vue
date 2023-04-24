<template>
  <AdminNavBar/>
  <h2 style="margin-top: 20px">Les marques et modèles présents</h2>
  <div class="selector-container">
    <el-cascader v-model="value" class="selector" :options="options" :props="props" collapse-tags collapse-tags-tooltip clearable placeholder="Liste des marques"/>
    <el-button type="danger" @click="test">Supprimer</el-button>
  </div>
  <el-divider/>
  <h2>Ajouter une marque</h2>
  <div class="selector-container">
    <el-input class="selector" placeholder="Nom de la nouvelle marque"/>
    <el-button type="primary">Ajouter</el-button>
  </div>
  <el-divider/>
  <h2>Ajouter un modèle</h2>
  <div class="selector-container">
    <el-input class="selector" placeholder="Nom du nouveau modèle"/>
    <el-button type="primary" style="margin-bottom: 36px">Ajouter</el-button>
  </div>
  <Footer/>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";
import {ref} from "vue";

export default {
  name: "AdminParameters",
  components: {Footer, AdminNavBar},
  data(){
    return {
      value: ref([]),
      props: {
        multiple: true
      },
      options: [
        {
          label: "Audi",
          value: "Audi",
          children: [
            {label: "i3", value: "i3"},
            {label: "i4", value: "i4"},
            {label: "i5", value: "i5"}
          ]
        },
        {
          label: "BMW",
          value: "BMW",
          children: [
            {label: "ix3", value: "ix3"},
            {label: "ix4", value: "ix4"},
            {label: "ix5", value: "ix5"}
          ]
        },
      ]
    }
  },
  methods: {
    test() {
      console.log(this.value)
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
  .selector-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .selector-container .el-button {
    margin: 10px;
  }
</style>