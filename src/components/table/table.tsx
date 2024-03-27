"use client";
import React, { FC, useState } from "react";
import { TableProps, TableColumn, DataItem } from "@/types/table";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { extractStringField, filterData } from "@/lib/utils";
import { formattedDate } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import Filter from "../filter";

const Table: FC<TableProps> = ({ data, columns }) => {
  const { onOpen } = useModal();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<boolean | null>(null);
  const [items, setItems] = useState<DataItem[]>(data);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const filteredData = filterData(items, debouncedSearchTerm, filter);

  const handleUpdate = <K extends keyof DataItem>({
    id,
    key,
    value,
  }: {
    id: number;
    key: K;
    value: string;
  }) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

  const renderCellContent = (item: DataItem, key: string) => {
    const keys = key.split(".");
    let value: any = item;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return "";
      }
    }
    return value;
  };
  // const renderCellContent = (item: DataItem, column: TableColumn) => {
  //   // Проверяем, есть ли у столбца подзаголовки
  //   if (column.subcolumns) {
  //     // Рендерим подзаголовки
  //     return (
  //       <>
  //         {column.subcolumns.map((subcolumn, index) => (
  //           <div key={index}>
  //             <strong>{subcolumn.header}</strong>: {item[subcolumn.key]}
  //           </div>
  //         ))}
  //       </>
  //     );
  //   } else {
  //     // В противном случае отображаем значение из данных
  //     return item[column.key];
  //   }
  // };

  return (
    <>
      <Filter setFilter={setFilter} setSearchTerms={setSearchTerm} />
      <table className="border w-full rounded mt-3">
        <thead className="border">
          <tr className="border">
            {columns.map((column, columnIndex) => (
              <th
                className="border"
                key={columnIndex}
                style={{ width: `${column.widthPercent}%` }}
              >
                {column.header}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td className="border" key={colIndex}>
                  {column.onRender
                    ? column.onRender(item)
                    : renderCellContent(item, column.key)}
                  {/* : renderCellContent(item, column)} */}
                </td>
              ))}
              <td>
                <Button
                  onClick={() =>
                    onOpen("edit", {
                      item,
                      id: item.id,
                      value: extractStringField(item),
                      handleUpdate,
                    })
                  }
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
