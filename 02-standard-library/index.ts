import { exec } from "node:child_process";
import { formatLog, getPlatformCommand, logToFile } from "./src/utils";
import { INTERVAL, ONE_MINUTE_INTERVAL } from "./src/models";

const command = getPlatformCommand();
let logTimer = 0;

setInterval(() => {
  logActivity();
}, INTERVAL);

function logActivity() {
  exec(command, (err: Error | null, stdout: string, stderr: string) => {
    if (err) {
      console.log(err.message);
      return;
    }

    let result: string = stdout.trim();
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    process.stdout.write(result);

    logTimer += INTERVAL;
    if (logTimer % ONE_MINUTE_INTERVAL === 0) {
      let log: string = formatLog(result);
      logToFile(log);
    }
  });
}
