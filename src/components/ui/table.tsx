"use client";

import React, { FC, useState } from "react";
import { renderTableCell } from "@/components/ui/render-table-ceil";
import { DataItem, TableProps } from "@/types/table";
import Filter from "../filter";
import { Button } from "./button";
import { useModal } from "@/hooks/use-modal-store";
import { extractStringField } from "@/lib/utils";

const Table: FC<TableProps> = ({ data, columns }) => {
  const { onOpen } = useModal();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<boolean | null>(null);
  const [items, setItems] = useState<DataItem[]>(data);

  const filteredData = items.filter((item) => {
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

  const handleUpdate = <K extends keyof DataItem>(args: {
    id: number;
    key: K;
    value: string;
  }) => {
    const { id, key, value } = args;
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      );
    });
  };

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
                colSpan={column.subcolumns ? column.subcolumns.length : 1}
              >
                {column.title}
              </th>
            ))}
            <th>Actions</th>
          </tr>

          <tr>
            {columns.map((column, columnIndex) => (
              <React.Fragment key={columnIndex}>
                {column.subcolumns ? (
                  column.subcolumns.map((subcolumn, subcolumnIndex) => (
                    <th
                      className="border"
                      key={`${columnIndex}-${subcolumnIndex}`}
                    >
                      {subcolumn}
                    </th>
                  ))
                ) : (
                  <th key={`${columnIndex}-empty`}></th>
                )}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <React.Fragment key={colIndex}>
                  {renderTableCell(item, column)}
                </React.Fragment>
              ))}
              <th>
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
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Table;
