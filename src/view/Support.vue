<template>
  <Navbar/>
  <div class="ticket-information">
    <p>ID du ticket : #<span>1</span></p>
    <p>Titre : <span>Titre du ticket</span></p>
    <p>Ouvert le <span>13/04/2023</span></p>
    <p>Statut : <span>Ouvert</span></p>
    <div>
      <el-button type="danger">Supprimer</el-button>
    </div>
  </div>
  <div class="conversation">
    <h2>Suivi du ticket</h2>
    <div class="conversation-container">
      <div class="container">
        <div class="message received">
          <p>Bonjour ! Comment vas-tu ?</p>
        </div>
        <div class="message sent">
          <p>Bonjour ! Je vais bien, merci. Et toi ?</p>
        </div>
        <div class="message received">
          <p>Je vais bien également, merci. Qu'as-tu prévu de faire aujourd'hui ?</p>
        </div>
        <div class="message sent">
          <p>Je pense aller me promener au parc cet après-midi. Et toi ?</p>
        </div>
        <div class="message received">
          <p>Je vais aller faire du shopping. Bonne promenade au parc !</p>
        </div>
        <div class="message received">
          <p>Je vais aller faire du shopping. Bonne promenade au parc !</p>
        </div>
        <div class="message received">
          <p>Je vais aller faire du shopping. Bonne promenade au parc !</p>
        </div>
        <div class="message sent">
          <p>Je pense aller me promener au parc cet après-midi. Et toi ?</p>
        </div>
        <div class="message received last">
          <p>Je vais aller faire du shopping. Bonne promenade au parc !</p>
        </div>
      </div>
      <div class="form">
        <textarea/>
        <div class="sendBtn">
          <font-awesome-icon icon="fa-solid fa-paper-plane" style="color: #ffffff;" />
        </div>
      </div>
    </div>
  </div>
  <h3 style="margin: 20px; text-align: center">Vous recevrez une notifications lorsqu'un administrateur répondra à votre ticket, les réponses arrivent en maximum 24 heures.</h3>
  <Footer/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Support",
  components: {Footer, Navbar}
}
</script>

<style scoped>
  .ticket-information {
    margin: 10px;
    padding: 10px;
    background-color: rgb(230, 230, 230);
    border-radius: 10px;
    position: relative;
  }
  .ticket-information p {
    margin: 5px;
  }
  .ticket-information div {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .conversation {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .conversation-container {
    position: relative;
  }
  .container {
    max-width: 600px;
    height: 400px;
    overflow-y: scroll;
    margin: 10px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .message {
    padding-right: 5px;
    padding-left: 5px;
    margin-bottom: 10px;
    border-radius: 5px;
    max-width: 50%;
    font-size: 0.9rem;
  }
  .message.sent {
    background-color: #ddd;
    align-self: flex-end;
  }
  .message.received {
    background-color: #8bc34a;
    align-self: flex-start;
  }
  .form {
    position: absolute;
    bottom: 13px;
    left: 10px;
    margin: auto;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .form textarea {
    resize: none;
    border-bottom-left-radius: 10px;
    width: 80%;
    height: 100%;
  }
  .sendBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 3px;
    border-radius: 5px;
    height: 100%;
    width: 40px;
    background-color: #8bc34a;
    cursor: pointer;
  }
  .last {
    margin-bottom: 30px;
  }
</style>