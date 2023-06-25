export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  isShow: boolean;
  createdAt: Date;
  updatedAt: Date;
}
