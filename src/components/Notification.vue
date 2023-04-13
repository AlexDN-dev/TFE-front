<template>
  <div class="notification">
    <p class="title">Titre de la notification</p>
    <div class="sender-container">
      <font-awesome-icon icon="fa-solid fa-user" size="lg" style="color: #000000;" />
      <p class="sender">Administrateur</p>
    </div>
    <p class="content">{{truncateText("Voici le début de la notifications", 68)}}</p>
  </div>

</template>

<script>
export default {
  name: "Notification",
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    }
  }
}
</script>

<style scoped>
  .notification {
    background-color: rgb(230, 230, 230);
    border-radius: 10px;
    width: 75%;
    padding: 10px;
    margin: 3px;
    position: relative;
  }
  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 0 5px;
  }
  .sender-container {
    display: flex;
    align-items: center;
  }
  .sender-container p {
    margin: 0 0 0 5px;
  }
  .content {
    margin: 10px 0 10px 5px;
    word-wrap: break-word;
  }
</style>