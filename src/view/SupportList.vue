<template>
  <Navbar/>
  <h2>Support</h2>
  <h3>Un problème avec votre compte ou notre site ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus bref délais.</h3>
  <h2>Ouvrir un ticket</h2>
  <div class="ticket">
    <div>
      <p>Nom et prénom</p>
      <el-input></el-input>
    </div>
    <div>
      <p>Titre</p>
      <el-input></el-input>
    </div>
    <div style="width: 100%">
      <p>Expliquer votre problème</p>
      <textarea></textarea>
    </div>
    <el-button style="margin: 10px">Envoyer</el-button>
  </div>
  <el-divider/>
  <h2>Vos tickets</h2>
  <div class="ticket-container">
    <div class="tickets">
      <el-table :data="dataTable" style="min-width: 320px; max-width: 700px" height="350">
        <el-table-column prop="title" label="Titre" align="center"/>
        <el-table-column prop="status" label="Status" align="center" width="110px">

          <template #default="scope">
            <p class="closed">{{scope.row.status}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Date" align="center"/>
        <el-table-column label="Action" align="center">
          <template #default="scope">
            <router-link to="/" class="router">
              <el-button type="info" plain>{{scope.row.id}}</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "SupportList",
  components: {Footer, Navbar},
  data(){
    return {
      dataTable: [
        {
          id: 0,
          title: "titre",
          status: "Fermé",
          date: "13/04/2023"
        },
        {
          id: 1,
          title: "titre",
          status: "Ouvert",
          date: "13/04/2023"
        },
        {
          id: 2,
          title: "titre",
          status: "Ouvert",
          date: "13/04/2023"
        },
      ]
    }
  }
}
</script>

<style scoped>
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.15rem;
    font-weight: 600;
  }
  h2, h3 {
    text-align: center;
  }
  .ticket {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  .ticket div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  textarea {
    resize: none;
    border: 1px solid rgb(220,220,220);
    border-radius: 5px;
    width: 50%;
    margin-bottom: 10px;
    height: 100px;
  }
  textarea:focus {
    outline: none !important;
  }
  .tickets {
    display: flex;
    justify-content: center;
  }
  .tickets p {
    margin: 5px;
  }
  .open {
    background-color: #F0F9EB;
    color: #67C23A;
    border: 2px solid #B3E19D;
    border-radius: 7px;
  }
  .closed {
    background-color: #FEF0F0;
    color: #F56C6C;
    border: 2px solid #FAB6B6;
    border-radius: 7px;
  }
  .router {
    color: white;
    text-decoration: none;
  }
</style>