import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  $resizer.css({opacity: '1'})
  const coords = $parent.getCoords()

  const type = $resizer.data.resize

  let delta
  let value

  document.onmousemove = e => {
    if (type === 'col') {
      delta = e.pageX - coords.right
      value = coords.width + delta
      if (value < 40) {
        value = 40
      }
      $resizer.css({left: (value - 4) + 'px', zIndex: 100})
    } else {
      delta = e.pageY - coords.bottom
      value = coords.height + delta
      if (value < 20) {
        value = 20
      }
      $resizer.css({top: (value - 4) + 'px', zIndex: 100})
    }
  }

  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-cell="${$parent.data.cell}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
    $resizer.css({opacity: null})
    document.onmousemove = null
    document.onmouseup = null
  }
}
