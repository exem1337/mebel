<script lang="ts" setup>
import { OrderService } from '#shared/services/order.service';

const cart = ref();
const address = ref();

async function loadData() {
  useFetch('/api/getCart', {
    method: 'POST',
    body: OrderService.getCart()
  }).then((res) => {
    cart.value = res.data?.value;
  })
}

async function onOrder() {
  await useFetch('/api/placeOrder', {
    method: 'POST',
    body: {
      address: address.value,
      cart: cart.value,
    }
  });
  OrderService.placeOrder(cart.value, address.value);
  await loadData();
}

onMounted(async () => {
  await loadData();
})
</script>

<template>
  <div class="cart">
    Корзина
    <div
      v-if="cart?.length"
      class="products"
    >
      <div
        v-for="item in cart"
        :key="item.id"
        class="product"
      >
        <div style="width: 300px">
          {{ item?.title }} <br>
          <span>{{ item.description }}</span>
        </div>
        <div style="width: 150px;">
          <span>
            Ширина: {{ item?.width }}см <br>
            Высота: {{ item.height }}см
          </span>
        </div>
        <div style="width: 200px;">
          <span>
            Производитель: {{ item?.manufactorer }} <br>
            Материал: {{ item?.material }} <br>
            Цвет: {{ item?.color }}
          </span>
        </div>
        <div style="width: 100px;">
          Цена: {{ item?.price * item.cartCount }}₽
        </div>
        <div style="width: 200px;">
          <input type="number" v-model="item.cartCount" min="0">
        </div>
      </div>
      <textarea placeholder="Адрес доставки" v-model="address" />
      <button @click="onOrder">Заказать</button>
    </div>
    <div v-else>
      Корзина пустая
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products {
  margin-top: 40px;

  .product {
    padding-top: 16px;
    padding-bottom: 16px;
    border-top: 1px solid gray;
    display: flex;
    align-items: center;

    div {
      font-size: 20px;

      span {
        font-size: 14px;
        color: #747474;
      }
    }
  }
}
</style>
