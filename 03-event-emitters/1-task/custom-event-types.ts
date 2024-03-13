export type Callback<T extends unknown[]> = (...args: T) => void;

export interface EventListenerMap {
  [eventName: string]: Callback<any>[];
}
