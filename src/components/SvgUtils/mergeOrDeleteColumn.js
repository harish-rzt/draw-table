import { getRowIndex } from "./tableData";

export const mergeOrDeleteColumn = ({ tableCols, tableRows, index, data }) => {
  const rowIndex = getRowIndex({ cells: tableRows[0].cells, cords: {x: data.x, y: data.y }});
  if(index === 0) {
    const modifiedCol = tableCols[1];
    modifiedCol.coordinates.width = modifiedCol.coordinates.width + data.width;
    modifiedCol.coordinates.x = data.x;
    const colsAfter = tableCols.slice(index+2, tableCols.length);

    const rows = tableRows.map(row => {
      const { cells } = row;
      const cellToRemove = cells[index];
      let newCells = cells.map((cell, i) => (
        i === index ? {
          ...cell,
          coordinates: {
            x: cell.coordinates.x,
            y: cell.coordinates.y,
            height: cell.coordinates.height,
            width: cell.coordinates.width + cells[i + 1].coordinates.width
          }
        } : cell
      ))
      newCells = newCells.filter((_, i) => index + 1 !== i);
      return {
        ...row,
        cells: newCells
      }
    });

    console.log('ROWS', rows);
    return { cols: [modifiedCol, ...colsAfter], rows};
  } else {
    const modifiedCol = tableCols[index-1];
    modifiedCol.coordinates.width = modifiedCol.coordinates.width + data.width;
    const colsBefore = tableCols.slice(0,index-1);
    const colsAfter = tableCols.slice(index+1, tableCols.length);

    const rows = tableRows.map(row => {
      const { cells } = row;
      const cellToRemove = cells[index];
      let newCells = cells.map((cell, i) => (
        i === index - 1 ? {
          ...cell,
          coordinates: {
            x: cell.coordinates.x,
            y: cell.coordinates.y,
            height: cell.coordinates.height,
            width: cell.coordinates.width + cells[i + 1].coordinates.width
          }
        } : cell
      ))
      newCells = newCells.filter((_, i) => index !== i);
      return {
        ...row,
        cells: newCells
      }
    });
    return { cols: [...colsBefore, modifiedCol, ...colsAfter], rows };
  }

};
