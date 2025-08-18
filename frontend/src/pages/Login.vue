<template>
  <div class="login-page">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <p>
      Нет аккаунта?
      <router-link to="/register">Регистрация</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // пока имитация входа
      if (this.email && this.password) {
        this.$router.push("/chat"); // 👈 переход в чат
      } else {
        alert("Введите email и пароль");
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
}
.login-page input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
.login-page button {
  width: 100%;
  padding: 10px;
  background: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
