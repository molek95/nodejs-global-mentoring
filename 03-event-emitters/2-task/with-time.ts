import EventEmitter from "../1-task/event-emitter";

class WithTime extends EventEmitter {
  async execute<T extends any[]>(
    asyncFunc: (...args: T) => Promise<any>,
    ...args: T
  ): Promise<void> {
    try {
      this.emit("begin");
      const startTime = process.hrtime();

      await asyncFunc(...args);

      const [seconds, nanoseconds] = process.hrtime(startTime);
      console.log(`Done in ${seconds}s, ${nanoseconds / 1000000}ms`);

      this.emit("end");
    } catch (error) {
      console.error("Error executing function: ", error);
    }
  }
}

export default WithTime;
