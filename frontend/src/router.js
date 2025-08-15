import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Chats from "./pages/Chats.vue";
import ChatWindow from "./pages/ChatWindow.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login },
    { path: "/register", component: Register },
    { path: "/chats", component: Chats },
    { path: "/chat/:id", component: ChatWindow }
  ]
});
