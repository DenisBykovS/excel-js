const CODES = {
  A: 65,
  Z: 90
}

function toCell(i) {
  return `
    <div class="cell" contenteditable data-cell="cell-${i+1}"></div>
  `
}

function toColumn(col, i) {
  return `
    <div class="column" data-type="resizable"  data-cell="cell-${i+1}">${col}
        <div class="col-resize" data-resize="col">
            <div class="line-y"></div>
        </div>
    </div>
  `
}

function createRow(index, content) {
  const resizer = index
    // eslint-disable-next-line max-len
    ? `<div class="row-resize" data-resize="row"><div class="line-x"></div></div>`
    : ''
  return `
  <div class="row" data-type="resizable">
    <div class="row-info">
        ${index}
        ${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `
}

export function createTable(rowsCount = 77) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
  }

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      // .map(toColumn)
      .map((col, id) => toColumn(col, id))
      .join('')
  rows.push(createRow( '', cols))
  
  for (let i = 0; i < rowsCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map((c, index) => toCell(index))
        .join('')
    rows.push(createRow(i + 1, cell))
  }
  return rows.join('')
}
