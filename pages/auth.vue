<script lang="ts" setup>
import { useUserStore } from '~/store/user.store';

const login = ref<string>();
const password = ref<string>();
const store = useUserStore();
const router = useRouter();

async function onLogin(): Promise<void> {
  const { data: user } = await useFetch('/api/auth', {
    method: 'POST',
    body: {
      login: login.value,
      password: password.value,
    }
  });
  if (user) {
    store.setUser(user);
    await router.push('/');
  }
}
</script>

<template>
  <div class="auth">
    Авторизация
    <input v-model="login" type="email" placeholder="Логин">
    <input v-model="password" type="password" placeholder="Пароль">
    <button @click="onLogin">Войти</button>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  padding: 40px;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 14px;

  input {
    min-height: 40px;
  }
  button {
    padding: 8px 16px;
  }
}
</style>
