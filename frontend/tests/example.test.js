// tests/example.test.js
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../src/App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/login', component: { template: '<div>Login</div>' } },
    { path: '/register', component: { template: '<div>Register</div>' } },
    { path: '/chat', component: { template: '<div>Chat</div>' } },
  ],
})

describe('App.vue', () => {
  it('рендерит навигацию', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Вход')
    expect(wrapper.text()).toContain('Регистрация')
    expect(wrapper.text()).toContain('Чат')
  })
})
