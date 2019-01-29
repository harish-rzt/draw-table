import { generateNewTableRow, generateRowCells } from './../SvgUtils/tableData';

export const splitOrAddRow = (data) => {
  const oldRowCords = { ...data.tableRows[data.index].coordinates };
  const row1Height = data.cords.y - oldRowCords.y;
  const newY = data.cords.y;
  const row2Height = (oldRowCords.y + oldRowCords.height) - data.cords.y;

  const row1Cells = generateRowCells({
    cells: data.tableRows[data.index].cells,
    cords: { height: row1Height },
  });
  const row1 = generateNewTableRow({
    id: 'x1',
    isHeader: false,
    cords: { ...oldRowCords, height: row1Height },
    styles: { fill: '#000' },
    cells: row1Cells,
  });
  const row2Cells = generateRowCells({
    cells: data.tableRows[data.index].cells,
    cords: { y: newY, height: row2Height },
  });
  const row2 = generateNewTableRow({
    id: 'x2',
    isHeader: false,
    cords: { ...oldRowCords, y: newY, height: row2Height },
    styles: {},
    cells: row2Cells,
  });

  const rowsBefore = data.tableRows.slice(0, data.index);
  const rowsAfter = data.tableRows.slice(data.index + 1, data.tableRows.length);

  return [...rowsBefore, row1, row2, ...rowsAfter];
};
