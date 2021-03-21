import {isEqual} from '@core/utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        // console.log('KEY', key)
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            // component.isWatching(key)
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]}
              component.storeChange(changes)
            }
          }
          )
        }
      })
      this.prevState = this.store.getState()

      if (process.env.NODE_ENV === 'development') {
        window['redux'] = this.prevState
      }
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}
