import BEvent from './event';
import { isFunction, isString } from './helper';

interface OnOptions {
  code?: string
  once: boolean
};

class Bus {
  private events: object

  constructor() {
    this.events = {};
  }

  private getEventObj(topic: string) {
    if (topic && !this.events[topic]) {
      this.events[topic] = new BEvent(topic);
    }
    return this.events[topic];
  }

  on(topic: string, fn: Function, option: OnOptions = { code: '', once: false }) {
    if (!isString(topic) || !isFunction(fn)) {
      throw new TypeError(`Param 'topic' must be a string and 'fn' must be a sync functions.`);
    };
    this.getEventObj(topic).addListener(fn, option.once, option.code);
  }

  once(topic: string, fn: Function) {
    this.on(topic, fn, { once: true });
  }

  off(topic: string, fn: Function, code: string = '') {
    if (!this.events[topic]) {
      return;
    }
    if (this.getEventObj(topic).removeListener(fn, code).getListeners().length === 0) {
      delete this.events[topic];
    }
  }

  clear(topic: string) {
    if (!topic) {
      return this.clearAll();
    }
    this.getEventObj(topic).removeAllListener();
    delete this.events[topic];
  }

  clearAll() {
    this.events = {};
  }

  emit(topic: string, ...params) {
    if (!topic || !this.events[topic]) {
      return;
    }
    this.getEventObj(topic).trigger(...params);
  }
}

export default Bus;