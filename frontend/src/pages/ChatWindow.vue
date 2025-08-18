<template>
  <div class="chat-window">
    <!-- Заголовок -->
    <header class="chat-header">
      <h2>Чат</h2>
    </header>

    <!-- Список сообщений -->
    <div class="chat-messages">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="chat-message"
        :class="{ 'chat-message--me': msg.me }"
      >
        <span>{{ msg.text }}</span>
      </div>
    </div>

    <!-- Поле ввода -->
    <footer class="chat-input">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Напишите сообщение..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Отправить</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "ChatWindow",
  data() {
    return {
      newMessage: "",
      messages: [
        { text: "Привет!", me: false },
        { text: "Привет 👋", me: true },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ text: this.newMessage, me: true });
        this.newMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}

.chat-header {
  background: #2c3e50;
  color: #fff;
  padding: 10px;
  text-align: center;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f9f9f9;
}

.chat-message {
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 10px;
  background: #eee;
  max-width: 70%;
}

.chat-message--me {
  background: #4caf50;
  color: white;
  margin-left: auto;
}

.chat-input {
  display: flex;
  border-top: 1px solid #ccc;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.chat-input button {
  padding: 10px 20px;
  border: none;
  background: #2c3e50;
  color: #fff;
  cursor: pointer;
}

.chat-input button:hover {
  background: #1a252f;
}
</style>
