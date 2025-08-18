// tests/login.test.js
import { mount } from '@vue/test-utils'
import Login from '../src/pages/Login.vue'

describe('Login.vue', () => {
  it('рендерит форму логина', () => {
    const wrapper = mount(Login)

    // Проверим наличие полей email и password
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')
    const button = wrapper.find('button')

    expect(emailInput.exists()).toBe(true)
    expect(passwordInput.exists()).toBe(true)
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Войти')
  })
})
