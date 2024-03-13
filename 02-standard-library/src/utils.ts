import * as fs from "node:fs";
import { Command, LOG_FILE } from "./models";

export function formatLog(result: string): string {
  let timestamp: string = Math.floor(Date.now() / 1000).toString();
  return `${timestamp} : ${result}\n`;
}

export function getPlatformCommand(): string {
  let command: string;
  if (process.platform === "win32") {
    command = Command.windows;
  } else {
    command = Command.unix;
  }
  return command;
}

export function logToFile(log: string): void {
  fs.appendFile(LOG_FILE, log, (err: Error | null) => {
    if (err) {
      console.log(err.message);
    }
  });
}
