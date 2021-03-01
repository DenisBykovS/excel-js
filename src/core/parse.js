export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      console.log('GGGG', eval(value.slice(1)))
      return eval(value.slice(1))
    } catch (e) {
      return value
    }
  }
  return value
}
