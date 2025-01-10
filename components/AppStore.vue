<script lang="ts" setup>
import AddProduct from '~/components/AddProduct.vue';
import type { IProduct } from '~/shared/models/product.model';
import { ProductManagementService } from '~/shared/services/productManagement.service';
import { useUserStore } from '~/store/user.store';
import { UserRoleEnum } from '#shared/enums/userRole.enum';
import { OrderService } from '#shared/services/order.service';

const store = useUserStore();

const products = ref<Array<IProduct>>();
if (process.client) {
  useFetch<Array<IProduct>>('/api/getProducts', {
    body: ProductManagementService.getAllProducts(),
    method: 'POST',
  }).then((res) => {
    products.value = res.data?.value;
  })
}
const isAddProductOpened = ref(false);
const editingProduct = ref<IProduct>();

async function onCreate(item: IProduct): Promise<void> {
  await useFetch('/api/createProduct', {
    body: item,
    method: 'POST',
  });
  if (process.client) {
    ProductManagementService.createProduct(item);
  }
  isAddProductOpened.value = false;
  await loadData();
}

async function onEditProduct(item: IProduct): Promise<void> {
  await useFetch('/api/editProduct', {
    body: item,
    method: 'POST'
  });
  if (process.client) {
    ProductManagementService.editProduct(item);
  }
  isAddProductOpened.value = false;
  editingProduct.value = null;
  await loadData();
}

async function loadData(): Promise<void> {
  await useFetch<Array<IProduct>>('/api/getProducts', {
    body: ProductManagementService.getAllProducts(),
    method: 'POST',
  }).then((res) => {
    products.value = res.data?.value;
  })
}

function onEdit(item: IProduct): void {
  editingProduct.value = item;
  isAddProductOpened.value = true;
}

async function onAddToCart(item: IProduct): Promise<void> {
  await useFetch('/api/addToCart', {
    body: item,
    method: 'POST'
  });
  if (process.client) {
    OrderService.addItemToCart(item);
  }
}

// onMounted(async () => {
//   await loadData();
// })
</script>

<template>
  <div class="store">
    <div class="button">
      <button
        v-if="store.user?.role === UserRoleEnum.Admin"
        @click="isAddProductOpened = true"
      >
        Добавить продукцию
      </button>
      <AddProduct
        v-if="isAddProductOpened"
        :item="editingProduct"
        @create="onCreate"
        @edit="onEditProduct"
        @close="() => {
          editingProduct = null;
          isAddProductOpened = false
        }"
      />
    </div>

    <div
      v-if="products?.length"
      class="products"
    >
      <div
        v-for="item in products"
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
          Цена: {{ item?.price }}₽
        </div>
        <div style="width: 200px;">
          <button
            v-if="store.user?.role === UserRoleEnum.Admin"
            @click="() => onEdit(item)"
          >
            Редактировать
          </button>
          <button
            v-else
            @click="() => onAddToCart(item)"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      Нет продукции
    </div>
  </div>
</template>

<style lang="scss" scoped>
.store {
  position: relative;

  .button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
}
</style>
