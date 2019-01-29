export const mergeOrDeleteColumn = ({ tableCols, index, data }) => {
  if(index === 0) {
    const modifiedCol = tableCols[1];
    modifiedCol.coordinates.width = modifiedCol.coordinates.width + data.width;
    modifiedCol.coordinates.x = data.x;
    const colsAfter = tableCols.slice(index+2, tableCols.length);
    return [modifiedCol, ...colsAfter];
  } else {
    const modifiedCol = tableCols[index-1];
    modifiedCol.coordinates.width = modifiedCol.coordinates.width + data.width;
    const colsBefore = tableCols.slice(0,index-1);
    const colsAfter = tableCols.slice(index+1, tableCols.length);
    return [...colsBefore, modifiedCol, ...colsAfter];
  }
};
