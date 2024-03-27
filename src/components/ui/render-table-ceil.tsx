import { ACTIVE, INACTIVE } from "@/constants/filter";

export const renderTableCell = (item: any, column: any) => {
  if (column.title === "active") {
    return <td>{item.active ? ACTIVE : INACTIVE}</td>;
  } else if (column.subcolumns) {
    return column.subcolumns.map(
      (subcolumn: string, subcolumnIndex: number) => (
        <td key={`${column.title}-${subcolumnIndex}`}>
          {item[column.title][subcolumn]}
        </td>
      )
    );
  } else {
    return <td>{item[column.title]}</td>;
  }
};
