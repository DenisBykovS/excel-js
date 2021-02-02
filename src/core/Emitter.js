export class Emitter {
  constructor() {
    this.listerens = {}
  }
  emit(event, ...args) {
    if (!Array.isArray(this.listerens[event])) {
      return false
    }
    this.listerens[event].forEach(listener => {
      listener(...args)
    })
    return true
  }
  subscribe(event, fn) {
    this.listerens[event] = this.listerens[event] || []
    this.listerens[event].push(fn)
    return () => {
      this.listerens[event] =
        this.listerens[event].filter(listener => listener !== fn)
    }
  }
}
