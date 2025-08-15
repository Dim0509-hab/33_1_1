<template>
  <div class="login">
    <h1>Вход</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    async login() {
      try {
        const res = await API.post("/login", {
          email: this.email,
          password: this.password
        });
        localStorage.setItem("token", res.data.token);
        this.$router.push("/chats");
      } catch (e) {
        alert("Ошибка входа");
      }
    }
  }
};
</script>
