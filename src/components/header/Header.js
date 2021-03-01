import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/dom';
import {headerTemplate} from '@/components/formula/header.tempate';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  // init() {
  //   super.init();
  //
  //   this.input = this.$root.find('#input')
  //
  //   this.updateTextTitleStore(this.input.text())
  // }

  toHTML() {
    return headerTemplate(this.store.getState())
  }


  // updateTextTitleStore(value) {
  //   this.$dispatch(actions.tableTitle({
  //     value
  //   })
  //   )
  // }

  onInput(event) {
    const $target = $(event.target)
    console.log('HEADER', $target.text())
    this.$dispatch(actions.tableTitle({
      data: $target.text()
    }))
  }
  // this.updateTextTitleStore($(event.target).text())
}
