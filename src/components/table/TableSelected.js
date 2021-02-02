import {$} from '@core/dom';

export class TableSelected {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelected.className)
    this.current = $el
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelected.className))
    this.group = []
  }
  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelected.className))
  }
}
