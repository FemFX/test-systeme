import { FC } from "react";
import { TableColumn } from "@/types/table";

interface TableHeaderProps {
  columns: TableColumn[];
}

const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className="border">
      <tr className="border">
        {columns.map((column, columnIndex) => {
          return (
            <th
              className="border"
              key={columnIndex}
              style={{ width: `${column.widthPercent}%` }}
            >
              {column.header}
            </th>
          );
        })}

        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
