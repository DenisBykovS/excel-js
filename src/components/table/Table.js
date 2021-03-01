import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize'
import {isCell, matrix, shouldResize, nextSelector} from './table.function';
import {TableSelected} from '@/components/table/TableSelected';
import {$} from '@core/dom';
import * as actions from '@/redux/actions'
// import {storage} from '@core/utils';
import {defaultStyle} from '@/constants';
import {parse} from '@core/parse';

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
    return createTable(30, this.store.getState())
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    // this.selection.select(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      console.log('VALUE', value)
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      // this.selection.current.text(String(parse(value)))
      // this.selection.current.text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      // this.selection.select(this.selection.current)
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })

    // this.storage = storage('excel-state')
    // const cells = this.storage.colState
    // const arr = []
    // for (const key in cells) {
    //   // eslint-disable-next-line no-prototype-builtins
    //   if ( cells.hasOwnProperty( key ) ) {
    //     arr.push(this.$root.findAll(`[data-cell="${key}"]`))
    //     arr.forEach( cols => {
    //       // console.log('cols', cols)
    //       cols.forEach( col => $(col).css({width: cells[key] + 'px'}))
    //     })
    //     arr.length = 0
    //   }
    // }

    // this.$subscribe(state => {
    //   console.log('TABLE_STATE', state.colState)
    // })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyle(Object.keys(defaultStyle))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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

  updateTextInStore(value) {
    console.log('STORE TEXT', value)
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    })
    )
  }

  onInput(event) {
    // this.$emit('table:select', $(event.target))
    this.updateTextInStore($(event.target).text())
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
