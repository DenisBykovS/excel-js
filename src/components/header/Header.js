import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/dom';
import {headerTemplate} from '@/components/header/header.template';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Delete this table')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.tableTitle($target.text()))
  }
  // this.updateTextTitleStore($(event.target).text())
}
