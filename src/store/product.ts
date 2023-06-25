import { Product } from "@/types/schema/product";
import { defineStore } from "pinia";
import { ref } from "vue";
import productApi from "@/api/product";
import { fromJson, fromDocument } from "@/utils/mapper/product.mapper";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);

  async function getProducts() {
    const docs = await productApi.getProducts();
    console.log(docs);

    products.value = docs.docs.map((doc) => fromDocument(doc));
    return products.value;
  }

  async function createProduct(product: any) {
    try {
      await productApi.createProduct(fromJson(product));
      await getProducts();

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function removeProduct(id: string) {
    try {
      await productApi.removeProduct(id);
      await getProducts();

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  return {
    products,
    getProducts,
    createProduct,
    removeProduct,
  };
});
