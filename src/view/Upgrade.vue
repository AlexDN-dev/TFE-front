<template>
  <Navbar/>
  <h2>ElectroAuto vous propose différentes offres pour avoir divers avantages sur notre plateforme.</h2>
  <div class="offer-container">
    <div class="offer o1">
      <h3>Offre 1</h3>
      <div>
        <p>Suppression des pubs</p>
        <p>Pouvoir poster jusqu'à 5 annonces</p>
      </div>
      <p class="price">1 € / à vie</p>
      <div class="buy-btn">
        <p>Acheter</p>
      </div>
    </div>
    <div class="offer o2">
      <h3>Offre 2</h3>
      <div>
        <p>Tous les avantages de l'offre 1</p>
        <p>Pouvoir poster jusqu'à 10 annonces</p>
        <p>Annonce vérifié en priorité par nos administrateurs</p>
        <p>Une publication sur notre page facebook avec votre annonce</p>
      </div>
      <p class="price">1 € / à vie</p>
      <div class="buy-btn">
        <p>Acheter</p>
      </div>
    </div>
    <div class="offer o3">
      <h3>Offre garage</h3>
      <div>
        <p>Tous les avantages de l'offre 1 et 2</p>
        <p>Pouvoir poster jusqu'à 100 annonces</p>
        <p>Avoir une page garage</p>
      </div>
      <p class="price">À discuter via le support</p>
      <div class="buy-btn">
        <p>Acheter</p>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Upgrade",
  components: {Footer, Navbar}
}
</script>

<style scoped>
  h2 {
    text-align: center;
  }
  .offer-container {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
  }
  .offer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 275px;
    height: 430px;
    color: white;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
  }
  .offer h3 {
    font-size: 1.4rem;
  }
  .o1 {
    background-image: linear-gradient(to left bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
  }
  .o2 {
    background-image: linear-gradient(to bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
  }
  .o3 {
    background-image: linear-gradient(to right bottom, #43a047, #5aa547, #6eab48, #80b049, #92b54c);
  }
  .price {
    font-size: 1.4rem;
    font-weight: bold;
  }
  .buy-btn {
    border: 3px solid #ffffff;
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;
  }
  .buy-btn p{
    margin: 0;
    padding: 10px 10px;
  }
</style>