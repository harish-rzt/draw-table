export const mergeOrDeleteRow = ({ tableRows, index, data }) => {
  if(index === 0) {
    const modifiedRow = tableRows[1];
    modifiedRow.coordinates.height = modifiedRow.coordinates.height + data.height;
    modifiedRow.coordinates.y = data.y;
    const rowsAfter = tableRows.slice(index+2, tableRows.length);
    return [modifiedRow, ...rowsAfter];
  } else {
    const modifiedRow = tableRows[index-1];
    modifiedRow.coordinates.height = modifiedRow.coordinates.height + data.height;
    const rowsBefore = tableRows.slice(0,index-1);
    const rowsAfter = tableRows.slice(index+1, tableRows.length);
    return [...rowsBefore, modifiedRow, ...rowsAfter];
  }
};
