const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(index, content) {
  return `
  <div class="row">
    <div class="row-info">${index}</div>
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
      .map(toColumn)
      .join('')
  rows.push(createRow( '', cols))
  
  for (let i = 0; i < rowsCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i + 1, cell))
  }

  // for (let i = 0; i < rowsCount; i++) {
  //   rows.push(createRow('', i + 1))
  // }


  return rows.join('')
}
