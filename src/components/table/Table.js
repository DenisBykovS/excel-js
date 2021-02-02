import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize'
import {isCell, matrix, shouldResize, nextSelector} from './table.function';
import {TableSelected} from '@/components/table/TableSelected';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  prepare() {
    this.selection = new TableSelected()
  }

  toHTML() {
    return createTable(30)
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('Formula:text', text => {
      this.selection.current.text(text)
    })

    this.$on('Formula:done', () => {
      this.selection.select(this.selection.current)
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('Table:to input', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('Table:to input', $(event.target))
  }

  // oneStepCell($el, key) {
  //   try {
  //     const el = $el.id(true)
  //     const cell = ''
  //     switch (key) {
  //       case 'Tab':
  //         this.cell = this.$root.find(`[data-id="${el.row}:${el.col + 1}"]`)
  //         if (this.cell.data.type !== 'cell') {
  //           break;
  //         } else {
  //           this.selection.select(this.cell)
  //
  //           break;
  //         }
  //       case 'Enter':
  //         this.cell = this.$root.find(`[data-id="${el.row + 1}:${el.col}"]`)
  //         if (this.cell.data.type !== 'cell') {
  //           break;
  //         } else {
  //           this.selection.select(this.cell)
  //           this.cell.focus()
  //           break;
  //         }
  //       case 'ArrowUp':
  //         this.cell = this.$root.find(`[data-id="${el.row - 1}:${el.col}"]`)
  //         if (this.cell.data.type !== 'cell') {
  //           break;
  //         } else {
  //           this.selection.select(this.cell)
  //           this.cell.focus()
  //           break;
  //         }
  //       case 'ArrowDown':
  //         this.cell = this.$root.find(`[data-id="${el.row + 1}:${el.col}"]`)
  //         if (this.cell.data.type !== 'cell') {
  //           break;
  //         } else {
  //           this.selection.select(this.cell)
  //           this.cell.focus()
  //           break;
  //         }
  //       case 'ArrowRight':
  //         this.cell = this.$root.find(`[data-id="${el.row}:${el.col + 1}"]`)
  //         if (this.cell.data.type !== 'cell') {
  //           break;
  //         } else {
  //           this.selection.select(this.cell)
  //           this.cell.focus()
  //           break;
  //         }
  //       case 'ArrowLeft':
  //         this.cell = this.$root.find(`[data-id="${el.row}:${el.col - 1}"]`)
  //         if (this.cell.data.type !== 'cell') {
  //           break;
  //         } else {
  //           this.selection.select(this.cell)
  //           this.cell.focus()
  //           break;
  //         }
  //     }
  //   } catch (e) {
  //     const err = e
  //   }
  // }

  // onKeydown(event) {
  //   switch (event.key) {
  //     case 'Tab':
  //       this.oneStepCell($(event.target), 'Tab')
  //       break;
  //     case 'Enter':
  //       this.oneStepCell($(event.target), 'Enter')
  //       break;
  //     case 'ArrowUp':
  //       this.oneStepCell($(event.target), 'ArrowUp')
  //       break;
  //     case 'ArrowDown':
  //       this.oneStepCell($(event.target), 'ArrowDown')
  //       break;
  //     case 'ArrowRight':
  //       this.oneStepCell($(event.target), 'ArrowRight')
  //       break;
  //     case 'ArrowLeft':
  //       this.oneStepCell($(event.target), 'ArrowLeft')
  //       break;
  //   }
  // }


  // onClick(event) {
  //   if (isCell(event)) {
  //     const cells = this.$root.findAll('[data-type="cell"]')
  //     cells.forEach(el => $(el).removeClass('selected'))
  //
  //     const element = $(event.target)
  //     this.selection.select(element)
  //   }
  // }
}
