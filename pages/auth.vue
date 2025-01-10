<script lang="ts" setup>
import { useUserStore } from '~/store/user.store';

const login = ref<string>();
const password = ref<string>();
const store = useUserStore();
const router = useRouter();
const errormessage = ref();

async function onLogin(): Promise<void> {
  errormessage.value = false;
  const { data: user } = await useFetch('/api/auth', {
    method: 'POST',
    body: {
      login: login.value,
      password: password.value,
    }
  });
  console.log(user)
  if (user.value?.role) {
    store.setUser(user.value);
    await router.push('/');
  }
  else {
    errormessage.value = true;
  }
}
</script>

<template>
  <div class="auth">
    Авторизация
    <input v-model="login" type="email" placeholder="Логин">
    <input v-model="password" type="password" placeholder="Пароль">
    <p v-if="errormessage">Введен некорректный логин или пароль</p>
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

  p {
    color: red;
  }

  input {
    min-height: 40px;
  }
  button {
    padding: 8px 16px;
  }
}
</style>
