<template>
  <div>
    <navbar/>
    <div class="hero-banner">
      <img src="../assets/bg.png" alt="">
      <p>Envie de faire un geste pour la planète ?<br>Penser à petit prix !</p>
    </div>
    <h3 class="title">Pourquoi passer à l'électrique ?</h3>
    <div class="square-container">
      <div class="square">
        <p>Les voitures électriques peuvent être moins chères à entretenir et à faire fonctionner à long terme.</p>
      </div>
      <div class="square">
        <p>Elles ont un impact environnemental moindre que les voitures à combustion interne.</p>
      </div>
      <div class="square">
        <p>Les propriétaires de voitures électriques peuvent bénéficier d'avantages fiscaux.</p>
      </div>
    </div>
    <div class="annonce">
      <img src="../assets/img/accueil/annonce.png">
    </div>
    <div class="marque-populaire">
      <div class="marque-populaire-title">
        <p>Toute les marques que vous souhaitez son sur notre plateforme !</p>
      </div>
      <div class="marque">
        <p>Les plus populaires</p>
        <div class="marque-container">
          <img src="../assets/img/accueil/marque/peugeot.png">
          <img src="../assets/img/accueil/marque/bmw.svg">
          <img src="../assets/img/accueil/marque/tesla.png">
          <img src="../assets/img/accueil/marque/mercedes.png">
          <img src="../assets/img/accueil/marque/renault.png">
          <img src="../assets/img/accueil/marque/volkswagen.svg.png">
        </div>
      </div>
    </div>
    <div>
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Accueil",
  components: {Footer, Navbar}
}
</script>

<style scoped>
  .hero-banner {
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: relative;
  }
  .hero-banner p {
    font-family: 'Comforta', Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 2em;
    text-align: center;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .title {
    text-align: center;
    font-size: 1.5em;
    font-weight: 800;
  }
  .square-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .square {
    text-align: center;
    width: 30%;
    height: 30%;
    background-color: #43A047;
    margin: 10px;
    border-radius: 5px;
    font-size: 1.2em;
    padding: 10px;
    font-weight: 500;
  }
  .annonce {
    background-color: #69BF6C;
    display: flex;
    justify-content: center;
    padding: 5px;
    margin: 10px 0;
  }
  .marque-populaire {
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 10px 10px 20px;
  }
  .marque-populaire-title {
    width: 25%;
    background-color: #43A047;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }
  .marque {
    background-color: #43A047;
    margin-left: 10px;
    border-radius: 5px;
  }
  .marque p {
    font-size: 1.25rem;
    font-weight: 600;
    text-decoration: underline;
  }
  .marque-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 97%;
  }
  .marque-container img {
    width: 130px;
    height: 130px;
    padding: 10px;
    opacity: 0.25;
    transition: 1s;
  }
  .marque-container img:hover {
    transition: .7s;
    opacity: 1;
  }
  @media screen and (max-width:1024px) {
    .square-container {
      flex-direction: column;
    }
    .square {
      width: 90%;
      height: 100%;
    }
    .annonce img {
      width: 100%;
      max-height: 140px;
    }
    .marque-populaire {
      flex-direction: column;
      margin: 0;
      align-items: center;
      justify-content: center;
    }
    .marque-populaire-title {
      width: 90%;
      margin: 10px;
      padding: 10px;
      font-size: 1rem;
    }
    .marque {
      width: 90%;
      padding: 10px;
      margin: 0 0 10px;
    }
  }
</style>