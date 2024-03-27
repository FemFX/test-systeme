import { Page } from "./pages";
import { PricePlan } from "./price-plans";
import { Product } from "./products";

export interface TableColumn {
  key: string;
  header: string;
  widthPercent: number;
  onRender?: (item: any) => JSX.Element;
}
export type DataItem = Product | PricePlan | Page;

export interface TableProps {
  data: DataItem[];
  columns: TableColumn[];
}
