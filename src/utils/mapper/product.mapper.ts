import { Product } from "@/types/schema/product";
import { DocumentData } from "firebase/firestore";

export function fromDocument(document: DocumentData): Product {
  const data = document.data();

  return {
    id: document.id,
    name: data.name,
    price: data.price ?? 0,
    stock: data.stock ?? 0,
    description: data.description ?? "",
    image: data.image ?? "",
    isShow: data.isShow ?? false,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  };
}

export function fromJson(data: any): Product {
  return {
    name: data.name,
    price: data.price ?? 0,
    stock: data.stock ?? 0,
    description: data.description ?? "",
    image: data.image ?? "",
    isShow: data.isShow ?? false,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  };
}
