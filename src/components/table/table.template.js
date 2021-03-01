import {toInlineStyles} from '@core/utils';
import {defaultStyle} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toColumn({col, id, width}) {
  return `
    <div 
    class="column"  
    data-type="resizable"  
    data-cell="${id}" style="width:${width}">
        ${col}
        <div class="col-resize" data-resize="col">
            <div class="line-y"></div>
        </div>
    </div>
  `
}

function createRow(index, content, state) {
  const resizer = index
    // eslint-disable-next-line max-len
    ? `<div class="row-resize" data-resize="row"><div class="line-x"></div></div>`
    : ''
  const height = getHeight(state, index)
  return `
  <div class="row" 
  data-type="resizable" 
  data-row="${index}"
  style="height: ${height}"
  >
    <div class="row-info">
        ${index}
        ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, id) {
    return {
      col, id, width: getWidth(state.colState, id)
    }
  }
}

export function createTable(rowsCount = 77, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')
  rows.push(createRow( '', cols, {}))
  
  for (let row = 0; row < rowsCount; row++) {
    // const nowHeight = getHeight(state.rowState, row + 1)
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(row + 1, cell, state.rowState))
  }
  return rows.join('')
}

function toCell(state, row) {
  return function(_, i) {
    const id = `${row}:${i}`
    const width = getWidth(state.colState, i)
    const data = state.dataState[id] || ''
    // eslint-disable-next-line max-len
    // const styles = state.stylesState[id] ? toInlineStyles(state.stylesState[id]) : toInlineStyles(defaultStyle)
    const styles = toInlineStyles({
      ...defaultStyle,
      ...state.stylesState[id]
    })
    return `
    <div 
    class="cell" 
    contenteditable 
    data-type="cell"
    data-cell="${i}" 
    data-id="${id}"
    data-value="${data || ''}" 
    style="${styles}; width: ${width}"
    >${parse(data) || ''}</div>
  `
  }
}
