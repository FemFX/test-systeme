"use client";
import { renderTableCell } from "@/components/render-table-ceil";
import { useState } from "react";

const Table = ({ data, columns }: any) => {
  console.log(columns);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, columnIndex) => (
            <th className="border" key={columnIndex}>
              {column}
              <tr>
                <th className="border">12</th>
                <th className="border">12</th>
              </tr>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>
                {/* Проверяем, является ли свойство вложенным объектом */}
                {typeof row[column] === "object"
                  ? Object.entries(row[column]).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}: </strong>
                        {value}
                      </div>
                    ))
                  : row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
