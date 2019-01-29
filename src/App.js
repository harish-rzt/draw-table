import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import drawRectangles from './components/SvgUtils/drawRectangles';
import drawSplitLine from './components/SvgUtils/drawSplitLine';
import { mergeOrDeleteRow } from './components/SvgUtils/mergeOrDeleteRow';
import { splitOrAddRow } from './components/SvgUtils/splitOrAddRow';
import {
  generateNewTable,
  getTableColCords,
  getTableCords,
  getTableRowCellCords,
  tableData,
} from './components/SvgUtils/tableData';
import { splitOrAddColumn } from './components/SvgUtils/splitOrAddColumn';
import { mergeOrDeleteColumn } from './components/SvgUtils/mergeOrDeleteColumn';

const getRelativeSVGPoints = (e, svgElement) => {
  let pt = svgElement.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const hoverCoordinates = pt.matrixTransform(svgElement.getScreenCTM().inverse());
  return hoverCoordinates;
};

const TableAction = {
  ADD_ROW: 'addRow',
  ADD_COL: 'addCol',
  DELETE_ROW: 'deleteRow',
  DELETE_COLUMN: 'deleteColumn',
};

const getTableAction = (mode, editEntity, editAction) => {
  if (mode === 'edit' && editEntity === 'row' && editAction === 'split') {
    return TableAction.ADD_ROW;
  }
  if (mode === 'edit' && editEntity === 'column' && editAction === 'split') {
    return TableAction.ADD_COL;
  }
  if (mode === 'edit' && editEntity === 'row' && editAction === 'delete') {
    return TableAction.DELETE_ROW;
  }
  if (mode === 'edit' && editEntity === 'column' && editAction === 'delete') {
    return TableAction.DELETE_COLUMN;
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: tableData,
      mode: 'edit', // view | edit,
      editEntity: 'row', // 'cell' | 'column' | 'row' | 'table'
      editAction: 'split', // 'merge' | 'delete' | 'split'
      selectedItems: new Set([]),
      splitLineCoordinates: null,
      splitAxis: 'vertical', // 'horizontal', 'vertical'
      drawnTable: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.selectEditEntity = this.selectEditEntity.bind(this);
    this.selectEditAction = this.selectEditAction.bind(this);
    this.selectSplitAxis = this.selectSplitAxis.bind(this);
    this.onMouseDraw = this.onMouseDraw.bind(this);
    this.createNextTable = this.createNextTable.bind(this);
    this.drawTableRow = this.drawTableRow.bind(this);
    this.drawTableColumn = this.drawTableColumn.bind(this);
    this.deleteTableRow = this.deleteTableRow.bind(this);
  }

  deleteTableRow({ e, index, nextData }) {
    e.stopPropagation();
    if (this.state.tableData.tableRows.length > 1) {
      const newRows = mergeOrDeleteRow({ tableRows: this.state.tableData.tableRows, index, data: nextData });
      this.setState({
        tableData: {
          ...this.state.tableData,
          tableRows: [...newRows],
        },
      });
    } else {
      // if the user trying to delete the only row
      alert('invalid operation');
    }

  }

  deleteTableColumn({ e, index, nextData }) {
    e.stopPropagation();
    if (this.state.tableData.tableCols.length > 1) {
      const newCols = mergeOrDeleteColumn({ tableCols: this.state.tableData.tableCols, index, data: nextData });
      this.setState({
        tableData: {
          ...this.state.tableData,
          tableCols: [...newCols],
        },
      });
    } else {
      // if the user trying to delete the only column
      alert('invalid operation');
    }

  }

  drawTableColumn({ e, index, nextData }) {
    console.log('drawTableColumn', e, index, nextData);
    e.stopPropagation();
    const cords = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const newCols = splitOrAddColumn({ cords, nextData, tableCols: this.state.tableData.tableCols, index });
    this.setState({ tableData: { ...this.state.tableData, tableCols: [...newCols] } });
  }

  drawTableRow({ e, index, nextData }) {
    e.stopPropagation();
    const cords = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const newRows = splitOrAddRow({ cords, nextData, tableRows: this.state.tableData.tableRows, index });
    this.setState({ tableData: { ...this.state.tableData, tableRows: [...newRows] } },
      () => console.log(this.state.tableData, newRows));
  }

  handleMouseMove(e, item) {
//    console.log('item ', item.id, ' hovered of type: ', item.type, ' for action: ', this.state.editAction, ' data: ', item);
    const getLineCoordinates = (item, hoverCoordinates, axis) => {
      const getLineCoordinatesByAxis = (item, hoverCoordinates, horizontalAxis) => {
        let itemWidth = item.width;
        let itemHeight = item.height;
        if (item.merged && (item.colSpan > 1 && item.rowSpan > 1)) {
          itemWidth = item.mergedWidth;
          itemHeight = item.mergedHeight;
        }
        return (
          horizontalAxis ? ({
            x1: item.x,
            y1: hoverCoordinates.y,
            x2: item.x + itemWidth,
            y2: hoverCoordinates.y,
          }) : ({
            x1: hoverCoordinates.x,
            y1: item.y,
            x2: hoverCoordinates.x,
            y2: item.y + itemHeight,
          })
        );
      };
      if (item.type === 'row') {
        return getLineCoordinatesByAxis(item, hoverCoordinates, true);
      } else if (item.type === 'col') {
        return getLineCoordinatesByAxis(item, hoverCoordinates, false);
      }
      return getLineCoordinatesByAxis(item, hoverCoordinates, this.state.splitAxis === 'horizontal');
    };

    if (this.state.mode !== 'view' && this.state.editAction === 'split') {
      e.stopPropagation();
      let pt = this.svgRef.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const hoverCoordinates = pt.matrixTransform(this.svgRef.getScreenCTM().inverse());
      this.setState({
        splitLineCoordinates: getLineCoordinates(item, hoverCoordinates),
      });
      // console.log({ l });
      // console.log('item ', item.id, ' hovered of type: ', item.type, ' for action: ', this.state.editAction, e.clientX, e.clientY)
      // const { selectedItems } = this.state;
      // this.setState({
      //   selectedItems: selectedItems.has(item.id) ?
      //     (this.state.selectedItems.delete(item.id) && this.state.selectedItems) : this.state.selectedItems.add(item.id),
      // })
    } else {
      // highlightTableData();
    }
  }

  handleClick({ e, index, nextData }) {
    const { mode, editEntity, editAction } = this.state;
    const actionType = getTableAction(mode, editEntity, editAction);

    switch (actionType) {
      case TableAction.ADD_ROW :
        e.stopPropagation();
        this.drawTableRow({ e, index, nextData });
        break;
      case TableAction.ADD_COL :
        this.drawTableColumn({ e, index, nextData });
        break;
      case TableAction.DELETE_ROW :
        this.deleteTableRow({ e, index, nextData });
        break;
      case TableAction.DELETE_COLUMN :
        this.deleteTableColumn({ e, index, nextData });
        break;
      default:
        break;
    }
  }

  handleMouseOut(e, item) {
    this.setState({ splitLineCoordinates: null });
  }

  selectMode(e) {
    this.setState({
      mode: e.target.value,
      selectedItems: new Set([]),
    });
  }

  selectEditEntity(e) {
    this.setState({
      editEntity: e.target.value,
      selectedItems: new Set([]),
    });
  }

  selectEditAction(e) {
    this.setState({
      editAction: e.target.value,
      selectedItems: new Set([]),
    });
  }

  selectSplitAxis(e) {
    this.setState({
      splitAxis: e.target.value,
    });
  }

  onMouseDraw(e) {
    const p = getRelativeSVGPoints(e, this.tableDrawCanvasSvg);
    console.log('mousemove p:', p);
    this.setState({
      drawnTable: {
        ...this.state.drawnTable,
        x2: p.x,
        y2: p.y,
      },
    });
  }

  createNextTable(e) {
    const getCoordinates = ({ x1, y1, x2, y2 }) => ({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    });
    const tableObj = {
      type: 'table',
      coordinates: getCoordinates(this.state.drawnTable),
    };
    console.log('tableObj: ', tableObj);
    const newTableData = generateNewTable(tableObj.coordinates);
    this.setState({ tableData: newTableData });
  }

  render() {
    const { mode, editEntity, editAction, selectedItems, splitLineCoordinates } = this.state;
    const applyHiddenClassName = (entityName) => mode === 'edit' && editEntity !== entityName ? 'noDisplay' : '';

    const tableClassNames = applyHiddenClassName('table');
    const tableRowClassNames = mode === 'view' ? 'noDisplay' : applyHiddenClassName('row');
    const tableColumnClassNames = mode === 'view' ? 'noDisplay' : applyHiddenClassName('column');
    const tableCellClassNames = applyHiddenClassName('cell');
    const showSplitAxisDropDown = (mode === 'edit')
      && (editAction === 'split' || editAction === 'split')
      && (editEntity === 'table' || editEntity === 'cell');

    const tableRowCellCords = getTableRowCellCords(this.state.tableData);

    const entityCoordinatesList = [
      {
        coordinates: getTableCords(this.state.tableData),
        className: tableClassNames,
        type: 'table',
      },
      {
        coordinates: tableRowCellCords.tableRowCords,
        type: 'row',
        className: tableRowClassNames,

      },
      {
        coordinates: getTableColCords(this.state.tableData),
        type: 'col',
        className: tableColumnClassNames,
      },
      {
        coordinates: tableRowCellCords.tableCellCords,
        type: 'cell',
        className: tableCellClassNames,
      },
    ];

    const tableFigure = entityCoordinatesList.map(entityCoordinates => drawRectangles(
      entityCoordinates.coordinates,
      entityCoordinates.className,
      selectedItems,
      this.handleClick,
      this.handleMouseMove,
      this.handleMouseOut,
      this.state.tableData
    ));

    return (
      <div className="App">
        <Header
          modeValue={this.state.mode}
          onModeChange={this.selectMode}
          editValue={this.state.editEntity}
          onEditChange={this.selectEditEntity}
          actionValue={this.state.editAction}
          onActionChange={this.selectEditAction}
          showAxisInput={showSplitAxisDropDown}
          axisValue={this.state.splitAxis}
          onAxisChange={this.selectSplitAxis}
        />
        <div className="App-content">
          <div className="presentation-area">
            <svg
              ref={r => this.svgRef = r}
              width="100%"
              height="100%">
              {tableFigure}
              {splitLineCoordinates && drawSplitLine(splitLineCoordinates)}
            </svg>
          </div>
          <div className="canvas-area">
            <svg
              ref={r => this.tableDrawCanvasSvg = r}
              width="100%"
              height="100%"
              style={{ background: 'white', cursor: 'crosshair' }}
              onMouseDown={(e) => {
                const p = getRelativeSVGPoints(e, this.tableDrawCanvasSvg);
                console.log({ p });
                this.setState({
                  drawnTable: {
                    x1: p.x,
                    y1: p.y,
                  },
                });
                this.tableDrawCanvasSvg.addEventListener('mousemove', this.onMouseDraw);
              }}
              onMouseUp={() => {
                this.tableDrawCanvasSvg.removeEventListener('mousemove', this.onMouseDraw);
              }}
              // onMouseDown={() => {
              //   const nextTableIndex = this.state.drawnTables.count();
              //
              // }}
              // onMouseUp={}
            >
              {
                this.state.drawnTable.x1 &&
                this.state.drawnTable.x2 &&
                <rect
                  x={Math.min(this.state.drawnTable.x1, this.state.drawnTable.x2)}
                  y={Math.min(this.state.drawnTable.y1, this.state.drawnTable.y2)}
                  width={Math.abs(this.state.drawnTable.x2 - this.state.drawnTable.x1)}
                  height={Math.abs(this.state.drawnTable.y2 - this.state.drawnTable.y1)}
                  fill="transparent"
                  stroke="black"
                  // className={className}
                  // onClick={onClick}
                  // onMouseMove={onMouseMove}
                  // onMouseOut={onMouseOut}
                  // fillOpacity={fillOpacity}
                />
              }
            </svg>
          </div>
        </div>
        <div className="footer">
          {this.state.drawnTable.x1 && this.state.drawnTable.x2 &&
          <button className="footer-btn" onClick={this.createNextTable}>
            Create Table
          </button>}
        </div>
      </div>
    );
  }
}

export default App;
