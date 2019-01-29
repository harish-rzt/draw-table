export const tableData = {
  id: 't1',
  confidenceScore: 50,
  tag: 'Bank details',
  coordinates: { x: 0, y: 0, width: 380, height: 190 },
  styles: { stroke: 'red', fill: 'transparent' },
  type: 'table',
  tableCols: [
    {
      id: 'col1',
      coordinates: { x: 5, y: 5, width: 90, height: 180 },
      styles: { stroke: 'blue', fill: 'transparent' },
      type: 'col',
    },
    {
      id: 'col2',
      coordinates: { x: 105, y: 5, width: 90, height: 180 },
      styles: { stroke: 'blue', fill: 'transparent' },
      type: 'col',
    },
    {
      id: 'col3',
      coordinates: { x: 205, y: 5, width: 90, height: 180 },
      styles: { stroke: 'blue', fill: 'transparent' },
      type: 'col',
    },
    {
      id: 'col4',
      coordinates: { x: 305, y: 5, width: 90, height: 180 },
      styles: { stroke: 'blue', fill: 'transparent' },
      type: 'col',
    },
  ],
  tableRows: [
    {
      id: 'row1',
      isHeader: true,
      coordinates: { x: 5, y: 5, width: 365, height: 45 },
      styles: { stroke: 'green', fill: 'transparent' },
      type: 'row',
      cells: [
        {
          id: 'cell11',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-11',
          coordinates: { x: 10, y: 10, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
        {
          id: 'cell12',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-12',
          coordinates: { x: 100, y: 10, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        }, {
          id: 'cell13',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-11',
          coordinates: { x: 190, y: 10, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        }, {
          id: 'cell14',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-12',
          coordinates: { x: 280, y: 10, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
      ],
    },
    {
      id: 'row2',
      isHeader: true,
      coordinates: { x: 5, y: 55, width: 365, height: 45 },
      styles: { stroke: 'green', fill: 'transparent' },
      type: 'row',
      cells: [
        {
          id: 'cell21',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-21',
          coordinates: { x: 10, y: 55, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
        {
          id: 'cell22',
          isNull: false,
          colSpan: 2,
          rowSpan: 2,
          value: 'c-22',
          coordinates: { x: 100, y: 55, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
          merged: true,
        }, {
          id: 'cell23',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-21',
          coordinates: { x: 190, y: 55, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
          merged: true,
        },
        {
          id: 'cell24',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-22',
          coordinates: { x: 280, y: 55, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
      ],
    },
    {
      id: 'row3',
      isHeader: true,
      coordinates: { x: 5, y: 105, width: 365, height: 45 },
      styles: { stroke: 'green', fill: 'transparent' },
      type: 'row',
      cells: [
        {
          id: 'cell31',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-21',
          coordinates: { x: 10, y: 100, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
        {
          id: 'cell32',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-22',
          coordinates: { x: 100, y: 100, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
          merged: true,
        }, {
          id: 'cell33',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-21',
          coordinates: { x: 190, y: 100, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
          merged: true,
        },
        {
          id: 'cell34',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-22',
          coordinates: { x: 280, y: 100, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
      ],
    },
    {
      id: 'row4',
      isHeader: true,
      coordinates: { x: 5, y: 155, width: 365, height: 45 },
      styles: { stroke: 'green', fill: 'transparent' },
      type: 'row',
      cells: [
        {
          id: 'cell41',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-21',
          coordinates: { x: 10, y: 145, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
        {
          id: 'cell42',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-22',
          coordinates: { x: 100, y: 145, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        }, {
          id: 'cell43',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-21',
          coordinates: { x: 190, y: 145, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
        {
          id: 'cell44',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-22',
          coordinates: { x: 280, y: 145, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
      ],
    },
  ],
};

export const getTableCords = (data) => ([{
  ...data.coordinates,
  ...data.styles,
  type: data.type,
  id: data.id,
}]);

export const getTableRowCellCords = (data) => data.tableRows.reduce((acc, cord, rowIndex) => {
  acc.tableRowCords.push({
    ...cord.coordinates,
    ...cord.styles,
    type: cord.type,
    id: cord.id,
    rowIndex,
  });
  const cells = cord.cells.map((cell, columnIndex) => ({
    ...cell.coordinates,
    ...cell.styles,
    type: cell.type,
    id: cell.id,
    rowIndex,
    columnIndex,
    merged: cell.merged,
    colSpan: cell.colSpan,
    rowSpan: cell.rowSpan,
  }));
  acc.tableCellCords = [...acc.tableCellCords, ...cells];
  return acc;
}, { tableRowCords: [], tableCellCords: [] });

export const getTableColCords = (data) => data.tableCols.map((col, columnIndex) => ({
  ...col.coordinates,
  ...col.styles,
  type: col.type,
  id: col.id,
  columnIndex,
}));


export const generateNewTable = ({ x, y, width, height }) => ({
  id: 't1',
  confidenceScore: 50,
  tag: 'Bank details',
  coordinates: { x, y, width, height },
  styles: { stroke: 'red', fill: 'transparent' },
  type: 'table',
  tableCols: [
    {
      id: 'col1',
      coordinates: { x: x + 5, y: y + 5, width: width - 10, height: height - 10 },
      styles: { stroke: 'blue', fill: 'transparent' },
      type: 'col',
    },
  ],
  tableRows: [
    {
      id: 'row1',
      isHeader: true,
      coordinates: { x: x + 5, y: y + 5, width: width - 10, height: height - 10 },
      styles: { stroke: 'green', fill: 'transparent' },
      type: 'row',
      cells: [
        {
          id: 'cell11',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-11',
          coordinates: { x: x + 5, y: y + 5, width: width - 10, height: height - 10 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
      ],
    },
  ],
});

export const generateRowCells = ({ cells, cords }) => {
  const rowWithCells = cells.map(cell => ({ ...cell, coordinates: { ...cell.coordinates, ...cords } }));
  return rowWithCells;
};

export const generateNewTableRow = ({ id = 'x', isHeader = false, cords, styles = {}, cells }) => ({
  id: id,
  isHeader: isHeader,
  coordinates: { x: cords.x, y: cords.y, width: cords.width, height: cords.height },
  styles: { stroke: 'green', fill: 'transparent', ...styles },
  type: 'row',
  cells,
});

