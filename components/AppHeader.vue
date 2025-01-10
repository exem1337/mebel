<script lang="ts" setup>
import { useUserStore } from '~/store/user.store';
import { UserRoleEnum } from '../shared/enums/userRole.enum';

const store = useUserStore();
const router = useRouter();

async function onLogout(): Promise<void> {
  store.logout();
  await router.push('/auth');
}
</script>

<template>
  <header class="header">
    <NuxtLink href="/">Мебельный салон</NuxtLink>
    <NuxtLink href="/">Главная</NuxtLink>
    <div v-if="store.user?.role">
      <NuxtLink v-if="store.user?.role === UserRoleEnum.Buyer" href="cart">Корзина</NuxtLink>
      <NuxtLink v-if="store.user?.role === UserRoleEnum.Admin" href="orders">Заказы</NuxtLink>
      <span>
        {{ store.user?.lastname }} {{ store.user?.firstname }} {{ store.user?.patronymic }}
        ({{ store.user.role === UserRoleEnum.Buyer ? 'Покупатель' : 'Администратор' }})
      </span>
      <button @click="onLogout">Выйти</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.header {
  height: 80px;
  background-color: #333333;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
  font-size: 24px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  a {
    text-decoration: none;
    color: white;
  }

  span {
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
