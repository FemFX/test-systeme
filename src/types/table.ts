import { Page } from "./pages";
import { PricePlan } from "./price-plans";
import { Product } from "./products";

export interface Column {
  title: string;
  subcolumns?: string[];
}

export type DataItem = Product | PricePlan | Page;

export interface TableProps {
  data: Product[] | PricePlan[] | Page[];
  columns: Column[];
}
