export class DataHandler {
  handlers: any[] = []

  subscribe(fn: Function) {
    this.handlers.push(fn)
  }

  unsubscribe(fn: Function) {
    this.handlers = this.handlers.filter((h) => h !== fn)
  }

  fire(o, thisObj) {
    this.handlers.forEach((item) => item.call(thisObj || window, o))
  }
}
