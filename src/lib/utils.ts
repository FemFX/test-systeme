import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DataItem } from "@/types/table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractStringField(item: DataItem): Record<string, string> {
  const stringFields: Record<string, string> = {};
  Object.entries(item)
    .filter(([key, value]) => typeof value === "string" && !key.includes("At"))
    .forEach(([key, value]) => {
      stringFields[key] = value;
    });
  return stringFields;
}

export function filterData(
  items: DataItem[],
  searchTerm: string,
  filter: boolean | null
): DataItem[] {
  return items.filter((item) => {
    const matchesSearchTerm = Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter == null) {
      return matchesSearchTerm;
    }
    return matchesSearchTerm && item.active === filter;
  });
}

export function formattedDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
