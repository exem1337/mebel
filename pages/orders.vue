<script lang="ts" setup>
import { OrderService } from '#shared/services/order.service';

const orders = ref();
const address = ref();

async function loadData() {
  useFetch('/api/getOrders', {
    method: 'POST',
    body: OrderService.getOrders()
  }).then((res) => {
    orders.value = res.data?.value;
  })
}

onMounted(async () => {
  await loadData();
})
</script>

<template>
  <div class="cart">
    <h2>Заказы</h2>
    <div
      v-if="orders?.length"
      class="orders"
    >
      <div
        v-for="order in orders"
        :key="order.created"
        class="order"
      >
        <p>
          Заказ от {{ (new Date(order.created)).toLocaleDateString('ru')  }} по адресу {{ order.address }}
        </p>
        <div class="products">
          <div
            v-for="item in order.cart"
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
            <div style="width: 200px;">
              Общая сумма: {{ item?.price * item.cartCount }}₽ <br>
              Количество: {{ item.cartCount }} <br>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Заказов нет
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order {
  margin-top: 40px;
  p {
    font-size: 20px;
  }
}

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
