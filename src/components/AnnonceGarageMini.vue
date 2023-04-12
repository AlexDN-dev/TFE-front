<template>
  <div class="annonce">
    <img src="../assets/img/voiture-exemple.jpg">
    <div class="informations">
      <div class="main-info">
        <p class="title">Nom du garage</p>
      </div>
      <div>
        <div class="what-selling">
          <h4>Marque(s) vendue(s)</h4>
          <p>BMW, Audi, Mercedes, Renault</p>
        </div>
      </div>
    </div>
    <div class="location">
      <font-awesome-icon icon="fa-solid fa-location-dot" size="lg" style="color: #000000;" />
      <p>Beaumont, Hainaut</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnonceGarageMini",
}
</script>

<style scoped>
  .annonce {
    width: 80%;
    display: flex;
    background-color: rgb(245, 245, 245);
    margin-bottom: 10px;
    padding: 10px;
    position: relative;
  }
  .annonce img {
    width: 30%;
  }
  .informations {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .informations .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 5px 0 0 10px;
  }
  .what-selling {
    margin-left: 10px;
  }
  .location {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 0;
  }
  .location p {
    margin-left: 5px;
  }
@media screen and (max-width:1024px) {
  .annonce {
    flex-direction: column;
    align-items: center;
    padding: 25px;
  }
  .annonce img {
    width: 235px;
    height: 150px;
  }
  .main-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .what-selling {
    text-align: center;
    padding-bottom: 10px;
  }
  .location {
    top: auto;
    bottom: 0;
    left: 10px;
    right: auto;
  }
}

</style>