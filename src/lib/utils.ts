import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Column, DataItem } from "@/types/table";

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
export function extractStringField(item: DataItem): Record<string, string> {
  const stringFields: Record<string, string> = {};
  Object.entries(item)
    .filter(([key, value]) => typeof value === "string" && !key.includes("At"))
    .forEach(([key, value]) => {
      stringFields[key] = value;
    });
  return stringFields;
}
