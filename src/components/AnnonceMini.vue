<template>
  <div class="annonce">
    <img src="../assets/img/voiture-exemple.jpg">
    <div class="informations">
      <div class="main-info">
        <p class="title">Titre de l'annonce</p>
        <p class="prix">12 999 €</p>
      </div>
      <div style="margin-bottom: 20px">
        <p class="description">Marque + Modèle</p>
        <div class="info">
          <div class="informations-container">
            <el-tooltip content="Kilométrage" placement="bottom" effect="dark">
            <font-awesome-icon icon="fa-solid fa-road" size="lg" style="color: #000000;" />
            </el-tooltip>
            <p>126.000 km</p>
          </div>
          <div class="informations-container">
            <el-tooltip content="Année de production" placement="bottom" effect="dark">
            <font-awesome-icon icon="fa-solid fa-calendar" size="lg" style="color: #000000;" />
            </el-tooltip>
            <p>06/2011</p>
          </div>
          <div class="informations-container">
            <el-tooltip content="Puissance" placement="bottom" effect="dark">
            <font-awesome-icon icon="fa-solid fa-gauge-high" size="lg" style="color: #000000;" />
            </el-tooltip>
            <p>400 kW (544CH)</p>
          </div>
          <div class="informations-container">
            <el-tooltip content="Autonomie" placement="bottom" effect="dark">
              <font-awesome-icon icon="fa-solid fa-car-battery" size="lg" style="color: #000000;" />
            </el-tooltip>
            <p>300Km</p>
          </div>
        </div>
      </div>
      <div class="location">
        <font-awesome-icon icon="fa-solid fa-location-dot" size="lg" style="color: #000000;" />
        <p>Beaumont, Hainaut</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnonceMini"
}
</script>

<style scoped>
  .annonce {
    width: 80%;
    display: flex;
    background-color: rgb(245, 245, 245);
    margin-bottom: 10px;
    padding: 10px;
  }
  .annonce img {
    width: 30%;
  }
  .informations {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .informations .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 5px 0 0 10px;
  }
  .main-info {
    width: 100%;
    display: flex;
    font-size: 1.4rem;
    font-weight: bold;
    justify-content: space-between;
  }
  .prix {
    margin: 5px 10px 0 0;
  }
  .description {
    margin: 3px 0 0 10px;
  }
  .informations-container {
    margin: 10px;
    display: flex;
    align-items: center;
  }
  .informations-container p {
    margin: 0 0 0 5px;
  }
  .info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 12px 0;
  }
  .location {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .location p {
    margin: 0 0 0 5px;
  }
  .el-popper span {
    font-family: 'Comforta', Helvetica, Arial, sans-serif;
  }
  @media screen and (max-width:1024px) {
    .annonce {
      flex-direction: column;
      align-items: center;
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
    .description {
      text-align: center;
      margin-top: 3px;
      margin-left: 0;
    }
  }
</style>