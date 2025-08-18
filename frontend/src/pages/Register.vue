<template>
  <div>
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Имя" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  try {
    await axios.post("/api/register", { name: name.value, email: email.value, password: password.value });
    router.push("/login");
  } catch (err) {
    alert("Ошибка регистрации");
  }
};
</script>
