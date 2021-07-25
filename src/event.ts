import { isFunction, isString } from './helper';

interface EventListener {
  code: string
  handler: Function
  once: boolean
}

class BEvent {
  private eventName: string
  private listeners: Array<EventListener>
  
  constructor(name: string) {
    this.eventName = name;
    this.listeners = [];
  }

  getListeners() {
    return this.listeners;
  }

  addListener(cbHandler: Function, once: boolean = false, code: string = '') {
    this.listeners.push({ code, handler: cbHandler, once });
    return this;
  }

  removeListener(cbHandler: Function, code: string = '') {
    if (!isFunction(cbHandler) && (!isString(code) || !code)) {
      throw new TypeError(`Param "cbHandler" should be a function or 'code' should be a string.`);
    }
    for (let i = 0; i < this.listeners.length; i++) {
      if ((code && code === this.listeners[i].code) || cbHandler === this.listeners[i].handler) {
        this.listeners.splice(i, 1);
        i -= 1;
      }
    }
    return this;
  }

  removeAllListener() {
    this.listeners = [];
    return this;
  }

  trigger(...params: any) {
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i].handler.apply(null, params);
      if (this.listeners[i].once) {
        this.listeners.splice(i, 1);
        i -= 1;
      }
    }
  }
}

export default BEvent;