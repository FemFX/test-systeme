import React, { FC } from "react";
import { Column } from "@/types/table";

interface TableHeaderProps {
  columns: Column[];
}

const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  return (
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
                <th className="border" key={`${columnIndex}-${subcolumnIndex}`}>
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
  );
};

export default TableHeader;
