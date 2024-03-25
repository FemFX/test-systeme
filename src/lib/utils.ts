import { Column, DataItem } from "@/types/table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateColumnsFromData = (data: DataItem[]): Column[] => {
  const columns: Column[] = [];

  if (data.length > 0) {
    const sampleItem = data[0] as Record<string, any>;
    Object.keys(sampleItem).forEach((key) => {
      const value = sampleItem[key];
      if (typeof value === "object" && !(value instanceof Date)) {
        const subKeys = Object.keys(value);
        columns.push({ title: key, subcolumns: subKeys });
      } else {
        columns.push({ title: key });
      }
    });
  }

  return columns;
};
