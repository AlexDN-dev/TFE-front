<template>
  <div class="footer">
    <div class="container">
      <a href="#">Informations</a>
      <a href="#">Support</a>
      <a href="#">Connexion</a>
    </div>
    <div class="container">
      <a href="#">Informations Légales</a>
      <a href="#">CGU</a>
      <a href="#">CGV</a>
    </div>
    <div class="container">
      <a href="#"><img src="../assets/img/accueil/footer/facebook.svg.png"></a>
      <a href="#"><img src="../assets/img/accueil/footer/twitter.svg.png"></a>
      <a href="#"><img src="../assets/img/accueil/footer/instagram.svg.png"></a>
    </div>
  </div>
  <div class="texte-footer">
    <p>© Copyright 2023 ElectroAuto Tous droits réservés.</p>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  .footer {
    background-color: rgb(245, 245, 245);
    display: flex;
    justify-content: space-around;
    font-size: 0.9rem;
  }
  .footer a {
    text-decoration: none;
    color: black;
  }
  .footer a img {
    width: 40px;
    height: 40px;
    margin: 5px;
    opacity: 0.25;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }
  .texte-footer {
    display: flex;
    align-items: center;
    margin-left: 5px;
    font-size: 0.75rem;
  }
</style>