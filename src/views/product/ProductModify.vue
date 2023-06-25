<script setup lang="ts">
import { useProductStore } from "@/store/product";
import productApi from "@/api/product";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const {
  params: { id },
} = useRoute();

console.log(id);

const router = useRouter();
const productStore = useProductStore();

productStore.getProduct(id);
const product = storeToRefs(productStore).product;

const uploadImage = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const image = await productApi.uploadImage(target.files![0]);
  product.value.image = image;
};

const saveProduct = async () => {
  const result = await productStore.updateProduct(product.value, id);
  if (result) {
    productStore.resetProduct();
    await router.push("/products");
  } else {
    alert("상품 수정에 실패하였습니다.");
  }
};

const goProductList = async () => {
  await router.push("/products");
};
</script>
<template>
  <div class="pa-3">
    <v-card>
      <v-card-title>상품추가</v-card-title>
      <v-form>
        <v-text-field
          v-model="product.name"
          label="상품명"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.price"
          label="가격"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.stock"
          label="수량"
          required
        ></v-text-field>
        <v-file-input
          label="썸네일"
          variant="filled"
          prepend-icon="mdi-camera"
          accept="image/*"
          @change="uploadImage"
        ></v-file-input>
        <img class="w-25" :src="product.image" />
      </v-form>
      <v-card-text class="text-right">
        <v-btn color="success" @click="saveProduct"> 저장 </v-btn>
        <v-btn color="default" @click="goProductList"> 목록 </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
