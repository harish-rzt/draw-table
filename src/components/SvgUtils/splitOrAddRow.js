import { generateNewTableRow } from './../SvgUtils/tableData';

export const splitOrAddRow = (data) => {

  console.log({ data });

  const oldRowCords = { ...data.tableRows[data.index].coordinates };

  const oldHeight = data.cords.y - oldRowCords.y;

  const newY = data.cords.y;
  const newHeight = (oldRowCords.y + oldRowCords.height) - data.cords.y;

  const row1 = generateNewTableRow({
    id: 'x1',
    isHeader: false,
    cords: { ...oldRowCords, height: oldHeight },
    styles: { fill: '#000' },
  });

  const row2 = generateNewTableRow({
    id: 'x2',
    isHeader: false,
    cords: { ...oldRowCords, y: newY, height: newHeight },
    styles: {},
  });

  const rowsBefore = data.tableRows.slice(0, data.index);
  const rowsAfter = data.tableRows.slice(data.index + 1, data.tableRows.length);

  return [...rowsBefore, row1, row2, ...rowsAfter];
};