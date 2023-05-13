<template>
  <Navbar />
  <div class="listeRecherche">
    <div class="header">
      <p>
        Nous avons pu trouver <span>{{ data.length }}</span> annonces par rapport au(x) filtre(s) que vous nous avez indiqué précédemment.</p>
    </div>
    <div class="annonce-container">
      <router-link
          v-for="annonce in currentPageData"
          :key="annonce.id"
          :to="`/annonce/voiture/${annonce.id}`"
          class="routing"
      >
        <AnnonceVoitureMini
            :id="annonce.id"
            :annonce="annonce"
            :title="annonce.title"
            :marque="annonce.marque"
            :modele="annonce.model"
            :prix="annonce.price"
            :km="annonce.km"
            :annee="annonce.annee"
            :puissance="annonce.puissance"
            :autonomie="annonce.autonomie"
        />
      </router-link>
    </div>
    <el-pagination
        class="pagination"
        layout="prev, pager, next"
        :total="data.length"
        :page-size="pageSize"
        v-model="currentPage"
        @current-change="handlePageChange"
    />
  </div>
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnnonceVoitureMini from "@/components/AnnonceVoitureMini.vue";
import axios from "axios";

export default {
  name: "ListeRecherche",
  components: { AnnonceVoitureMini, Footer, Navbar },
  data() {
    return {
      data: [],
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    currentPageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.data.slice(startIndex, endIndex);
    },
    showNoAnnonce() {
      return this.data.length === 0;
    }
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
    }
  },

  mounted() {
    const queryParams = this.$route.query;
    const queryString = Object.keys(queryParams)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key]))
        .join("&");
    const url = `http://localhost:3000/annonce?${queryString}`;
    axios
        .get(url)
        .then((response) => {
          this.data = response.data.response.rows;
          console.log(this.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la requête:", error);
        });
  }
};
</script>

<style scoped>
.header {
  text-align: center;
}
.header span {
  font-weight: bold;
}
.annonce-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.listeRecherche {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  margin: 10px;
}
.routing {
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
}
.visible {
  display: none;
}
.noAnnonce {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.noAnnonce img{
  width: 30%;
  margin: 15px;
}
.noAnnonce p {
  font-size: 1.25rem;
}
</style>
