export const renderTableCell = (item: any, column: any) => {
  const keys = column.split("."); // Разделение ключей для обработки вложенных объектов
  let value = item;
  for (const key of keys) {
    value = value[key];
  }

  // Если значение является объектом, преобразуем его в строку для отображения
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  // Рендерим содержимое ячейки таблицы
  return <td key={column}>{value}</td>;
};
