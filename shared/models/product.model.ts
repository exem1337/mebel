export interface IProduct {
  id?: number;
  title: string;
  description: string;
  width: number;
  height: number;
  color: string;
  material: string;
  price: number;
  manufactorer: string;
  cartCount?: number;
}
