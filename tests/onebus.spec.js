const { default: event } = require('../dist/build/event');
const OneBus = require('../dist/build/index');

describe(`Test OneBus`, () => {

  test('Test OneBus on()', () => {
    const event = 'hello';
    const params1 = [1, 2, 3];
    const params2 = 'world';
    const callback = jest.fn();

    OneBus.on(event, callback);
    OneBus.emit(event, ...params1);
    expect(callback).toBeCalledWith(...params1);

    OneBus.emit(event, params2);
    expect(callback).toBeCalledWith(params2);
  });
  
  test('Test OneBus once()', () => {
    const event = 'hello';
    const params = [1, 2, 3];
    const callback = jest.fn();

    OneBus.once(event, callback);
    OneBus.emit(event, ...params);
    
    expect(callback).toBeCalledWith(...params);
    OneBus.emit(event, ...params);
    OneBus.emit(event, ...params);
    expect(callback).toBeCalledTimes(1);
  });

  test('Test OneBus onec() & on() & off()', () => {
    const event1 = 'hello';
    const event2 = 'world';
    const params = [1, 2, 3];
    const callback = jest.fn();

    OneBus.once(event1, callback);
    OneBus.on(event2, callback);
    OneBus.emit(event1, ...params);
    
    expect(callback).toBeCalledWith(...params);
    OneBus.emit(event2, ...params);
    OneBus.emit(event2, ...params);
    expect(callback).toBeCalledTimes(3);

    OneBus.off(event1, callback);
    OneBus.off(event2, callback);
    OneBus.emit(event1, ...params);
    OneBus.emit(event2, ...params);
    expect(callback).toBeCalledTimes(3);
  });

  test('Test OneBus on() & off() use code', () => {
    const event = 'hello';
    const params = [1, 2, 3];
    const callback = jest.fn();
    const code1 = 'f43gyh413hg4';
    const code2 = 'g52hgb2hjbnh';
    OneBus.on(event, callback, { code: code1 });
    OneBus.on(event, callback, { code: code2 });

    OneBus.emit(event, params);
    expect(callback).toBeCalledTimes(2);

    // off width code
    OneBus.off(event, null, code1);
    OneBus.emit(event, params);
    expect(callback).toBeCalledTimes(3);
    OneBus.off(event, null, code2);
    OneBus.emit(event, params);
    expect(callback).toBeCalledTimes(3);

    // off width callback function
    OneBus.on(event, callback, { code: code1 });
    OneBus.on(event, callback, { code: code2 });
    OneBus.off(event, callback);
    OneBus.emit(event, params);
    expect(callback).toBeCalledTimes(3);
  });

  test('Test OneBus clear()', () => {
    const event1 = 'hello';
    const event2 = 'world';
    const params = [1, 2, 3];
    const callback = jest.fn();
    OneBus.on(event1, callback);
    OneBus.on(event2, callback);

    // clear one of event1 and event2
    OneBus.clear(event1);
    OneBus.emit(event1, params);
    expect(callback).toBeCalledTimes(0);

    OneBus.clear(event2);
    OneBus.emit(event2, params);
    expect(callback).toBeCalledTimes(0);

    // reset bus
    OneBus.on(event1, callback);
    OneBus.on(event2, callback);
    OneBus.emit(event1, params);
    OneBus.emit(event2, params);
    expect(callback).toBeCalledWith(params);
    expect(callback).toBeCalledTimes(2);

    // clear all
    OneBus.clear();
    OneBus.emit(event1, params);
    OneBus.emit(event2, params);
    expect(callback).toBeCalledTimes(2);
  });

  test('Test OneBus clearAll()', () => {
    const event1 = 'hello';
    const event2 = 'world';
    const params = [1, 2, 3];
    const callback = jest.fn();

    OneBus.on(event1, callback);
    OneBus.on(event2, callback);

    // clear all
    OneBus.clearAll();
    OneBus.emit(event1, params);
    OneBus.emit(event2, params);
    expect(callback).toBeCalledTimes(0);
  });
  
  test('Test OneBus width throw error', () => {
    const event = 'hello';
    const params = [1, 2, 3];
    const callback = jest.fn();
    
    const fn1 = () => {
      OneBus.on(event, params);
    };
    expect(fn1).toThrowError();

    OneBus.on(event, callback);
    OneBus.emit(event, 'word');
    expect(callback).toBeCalledWith('word');

    const fn2 = () => {
      OneBus.off(event, params);
    };
    expect(fn2).toThrowError();
  });

});