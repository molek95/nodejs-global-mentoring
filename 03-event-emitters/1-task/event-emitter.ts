import { EventListenerMap, Callback } from "./custom-event-types";

class CustomEventEmitter {
  private listeners: EventListenerMap = {};

  public addListener<T extends any[]>(
    eventName: string,
    fn: Callback<T>
  ): void {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  }

  public on<T extends any[]>(eventName: string, fn: Callback<T>): void {
    this.addListener(eventName, fn);
  }

  public removeListener<T extends any[]>(
    eventName: string,
    fn: Callback<T>
  ): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    }
  }

  public off<T extends any[]>(eventName: string, fn: Callback<T>): void {
    this.removeListener(eventName, fn);
  }

  public once<T extends any[]>(eventName: string, fn: Callback<T>): void {
    const onceWrapper: Callback<T> = (...args: T) => {
      fn(...args);
      this.removeListener(eventName, onceWrapper);
    };
    this.addListener(eventName, onceWrapper);
  }

  public emit(eventName: string, ...args: unknown[]): void {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((fn) => {
        fn(...args);
      });
    }
  }

  public listenerCount(eventName: string): number {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  public rawListeners<T extends any[]>(eventName: string): Callback<T>[] {
    return this.listeners[eventName] || [];
  }
}

export default CustomEventEmitter;
