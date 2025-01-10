<script lang="ts" setup>
import { COLOR_OPTIONS, MANUFACTURERS_OPTIONS, MATERIAL_OPTIONS } from '~/shared/constants/baseDictionaires.const';
import type { IProduct } from '~/shared/models/product.model';

const props = defineProps<{
  item?: IProduct;
}>();

const emits = defineEmits<{
  (e: 'edit', item: IProduct): void;
  (e: 'create', item: IProduct): void;
  (e: 'close'): void;
}>();

const title = ref<string>();
const description = ref<string>();
const width = ref<number>();
const height = ref<number>();
const color = ref<string>();
const material = ref<string>();
const price = ref<number>();
const manufactorer = ref<string>();

function onSave(): void {
  if (!props.item) {
    emits('create', {
      id: Math.random(),
      title: title.value,
      description: description.value,
      width: width.value,
      height: height.value,
      color: color.value,
      material: material.value,
      price: price.value,
      manufactorer: manufactorer.value,
    });
  }
  else {
    emits('edit', {
      id: props.item.id,
      title: title.value,
      description: description.value,
      width: width.value,
      height: height.value,
      color: color.value,
      material: material.value,
      price: price.value,
      manufactorer: manufactorer.value,
    })
  }
}

onMounted(() => {
  if (props.item) {
    title.value = props.item.title;
    description.value = props.item.description;
    width.value = props.item.width;
    height.value = props.item.height;
    color.value = props.item.color;
    material.value = props.item.material;
    price.value = props.item.price;
    manufactorer.value = props.item.manufactorer
  }
})
</script>

<template>
  <div class="add-product">
    <p>Редактор продукции</p>
    <input v-model="title" type="text" placeholder="Наименование">
    <textarea v-model="description" placeholder="Описание" />
    <input v-model="price" type="number" placeholder="Цена, ₽" min="0">
    <input v-model="width" type="number" placeholder="Ширина, см" min="0">
    <input v-model="height" type="number" placeholder="Высота, см" min="0">
    <select v-model="color" name="select">
      <option
        v-for="item in COLOR_OPTIONS"
        :key="item"
        :value="item">{{ item }}
      </option>
    </select>
    <select v-model="material" name="select">
      <option
        v-for="item in MATERIAL_OPTIONS"
        :key="item"
        :value="item">{{ item }}
      </option>
    </select>
    <select v-model="manufactorer" name="select">
      <option
        v-for="item in MANUFACTURERS_OPTIONS"
        :key="item"
        :value="item">{{ item }}
      </option>
    </select>
    <div class="buttons">
      <button class="secondary" @click="$emit('close')">Закрыть</button>
      <button @click="onSave">Сохранить</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-product {
  padding: 16px;
  border-radius: 8px;
  border: 1px solid gray;
  position: absolute;
  right: -240px;
  top: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  input {
    height: 56px;
    width: 100%;
  }

  textarea {
    height: 56px;
    width: 100%;
  }

  select {
    height: 56px;
    width: 100%;
  }

  .buttons {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  button {
    width: 100%;
  }
}
</style>
