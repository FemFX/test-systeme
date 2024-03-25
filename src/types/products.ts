export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: number;
  name: string;
  options: {
    size: Size;
    amount: number;
  };
  active: boolean;
  createdAt: string;
}
