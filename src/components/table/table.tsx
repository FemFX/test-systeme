"use client";

import React, { FC, useState } from "react";
import { useDebounce } from "use-debounce";
import { renderTableCell } from "@/components/ui/render-table-ceil";
import { DataItem, TableProps } from "@/types/table";
import Filter from "../filter";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { extractStringField, filterData } from "@/lib/utils";
import TableHeader from "./table-header";

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

  return (
    <>
      <Filter setFilter={setFilter} setSearchTerms={setSearchTerm} />
      <table className="border w-full rounded mt-3">
        <TableHeader columns={columns} />
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
