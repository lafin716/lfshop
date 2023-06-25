import { db, storage } from "@/plugins/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
} from "firebase/firestore";
import { Product } from "@/types/schema/product";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default {
  async getProducts() {
    const q = query(collection(db, "products"), limit(20));
    const docs = await getDocs(q);

    return docs;
  },

  async getProduct(id: string) {
    const data = getDoc(doc(db, "products", id));
    return data;
  },

  async createProduct(product: Product) {
    await addDoc(collection(db, "products"), product);
  },

  async updateProduct(product: Product | any, id: string) {
    const result = await updateDoc(doc(db, "products", id), product);
    return result;
  },

  async removeProduct(id: string) {
    const result = await deleteDoc(doc(db, "products", id));
    return result;
  },

  async uploadImage(file: File): Promise<string> {
    const newFileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, `products/${newFileName}`);
    const snap = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(snap.ref);

    return imageUrl;
  },
};
