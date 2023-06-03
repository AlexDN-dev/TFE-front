<template>
  <div class="notification">
    <p class="title">{{ titre }}</p>
    <div class="sender-container">
      <font-awesome-icon icon="fa-solid fa-user" size="lg" style="color: #000000;" />
      <p class="sender">{{ sender }}</p>
    </div>
    <p class="content">{{ texte }}</p>
    <el-tooltip content="Non lu" v-if="readed === 0">
      <div class="isReaded"/>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "NotificationItem",
  props: ['titre', 'sender', 'texte', "readed"],
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
  .isReaded {
    top: 10px;
    right: 10px;
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: #e80808;
    border-radius: 25px;
    box-shadow: 2px 2px 2px 1px rgba(255, 0, 0, 0.2);
  }
</style>