<template>
  <AdminNavBar/>
  <h2>Envoie de notification</h2>
  <el-form class="form">
    <div class="select">
      <el-select-v2 class="selector" v-model="receiver" filterable clearable :options="selectMarque" placeholder=" "/>
    </div>
    <div class="area-container">
      <textarea/>
    </div>
    <el-form-item>
      <el-button type="primary" style="margin: 10px">Envoyer</el-button>
    </el-form-item>
  </el-form>
  <Footer/>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "AdminNotification",
  components: {Footer, AdminNavBar},
  data(){
    return {
      selectMarque: [
        {label: "label1", value: "value1"},
        {label: "label2", value: "value2"},
        {label: "label3", value: "value3"},
        {label: "label4", value: "value4"},
        {label: "label5", value: "value5"},
      ],
      receiver: ""
    }
  }
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .select {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .selector {
    width: 300px;
    margin: 10px;
  }
  .area-container {
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: center;
  }
  textarea {
    width: 95%;
    margin: 0;
    height: 300px;
    resize: none;
    border-radius: 5px;
  }
</style>