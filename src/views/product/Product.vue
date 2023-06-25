<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "@/store/product";
import { onServerPrefetch } from "vue";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
productStore.getProducts();

const products = storeToRefs(productStore).products;

const remove = async (id: string) => {
  if (!confirm("정말로 삭제하시겠습니까?")) return;
  const result = await productStore.removeProduct(id);
  if (result) {
    alert("상품이 삭제되었습니다.");
  } else {
    alert("상품 삭제에 실패하였습니다.");
  }
};
</script>
<template>
  <div class="pa-3">
    <v-card>
      <v-card-title>상품관리</v-card-title>
      <v-card-text class="text-right">
        <v-btn color="default" to="/products/add"> 상품등록 </v-btn>
      </v-card-text>
      <v-table>
        <colgroup>
          <col width="10%" />
          <col width="*" />
          <col width="15%" />
          <col width="15%" />
          <col width="20%" />
        </colgroup>
        <thead>
          <tr>
            <th>이미지</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.name">
            <td><img class="w-50" :src="item.image" /></td>
            <td>
              <router-link :to="`/products/${item.id}`">{{
                item.name
              }}</router-link>
            </td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>
              <v-btn
                color="primary"
                size="small"
                :to="`/products/${item.id}`"
                class="mr-2"
                >수정</v-btn
              >
              <v-btn
                color="error"
                size="small"
                v-if="item.id"
                @click="remove(item.id!)"
                >삭제</v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<style scoped>
.link {
  color: #1976d2;
  text-decoration: none;
  cursor: pointer;
}
</style>
