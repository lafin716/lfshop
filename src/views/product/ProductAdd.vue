<script setup lang="ts">
import { ref } from "vue";
import { useProductStore } from "@/store/product";
import productApi from "@/api/product";
import { useRoute, useRouter } from "vue-router";

const productStore = useProductStore();
const product = ref({
  name: "",
  price: 0,
  description: "",
  image: "",
  category: "",
  stock: 0,
});

const uploadImage = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const image = await productApi.uploadImage(target.files![0]);
  product.value.image = image;
};

const saveProduct = async () => {
  const result = await productStore.createProduct(product.value);
  if (result) {
    alert("상품이 등록되었습니다.");
    product.value = {
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "",
      stock: 0,
    };
    const router = useRouter();
    await router.push("/products");
  } else {
    alert("상품 등록에 실패하였습니다.");
  }
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
      </v-form>
      <v-card-text class="text-right">
        <v-btn color="success" @click="saveProduct"> 저장 </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
