import { Product } from "@/types/schema/product";
import { defineStore } from "pinia";
import { ref } from "vue";
import productApi from "@/api/product";
import { fromJson, fromDocument } from "@/utils/mapper/product.mapper";

export const useProductStore = defineStore("product", () => {
  const defaultProduct = {
    id: "",
    name: "",
    price: 0,
    stock: 0,
    description: "",
    image: "",
    isShow: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const products = ref<Product[]>([]);
  const product = ref<Product>(defaultProduct);

  async function resetProduct() {
    product.value = defaultProduct;
  }

  async function getProducts() {
    const docs = await productApi.getProducts();
    console.log(docs);

    products.value = docs.docs.map((doc) => fromDocument(doc));
    return products.value;
  }

  async function getProduct(id: string | string[]) {
    if (!id) return null;
    if (Array.isArray(id)) {
      id = id[0];
    }
    const doc = await productApi.getProduct(id);
    product.value = fromDocument(doc);
    console.log("product", doc);

    return fromDocument(doc);
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

  async function updateProduct(product: any, id: string | string[]) {
    if (!id) return null;
    if (Array.isArray(id)) {
      id = id[0];
    }
    try {
      await productApi.updateProduct(fromJson(product), id);
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
    product,
    resetProduct,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
  };
});
