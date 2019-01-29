import { generateNewTableColumn } from './tableData';
export const splitOrAddColumn = (data) => {
  const oldColCords = { ...data.tableCols[data.index].coordinates };
  const col1Width = data.cords.x - oldColCords.x;
  const newX = data.cords.x;
  const col2Width = (oldColCords.x + oldColCords.width) - data.cords.x;

  const col1 = generateNewTableColumn({
    id: 'x1',
    isHeader: false,
    cords: { ...oldColCords, width: col1Width },
    styles: {},
  });
  
  const col2 = generateNewTableColumn({
    id: 'x2',
    isHeader: false,
    cords: { ...oldColCords, x: newX, width: col2Width },
    styles: {},
  });

  const colsBefore = data.tableCols.slice(0, data.index);
  const colsAfter = data.tableCols.slice(data.index + 1, data.tableCols.length);

  return [...colsBefore, col1, col2, ...colsAfter];
};