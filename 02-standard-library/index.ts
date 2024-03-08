import { exec } from "node:child_process";
import { formatLog, getPlatformCommand, logToFile } from "./src/utils";

function logActivity(): void {
  const command = getPlatformCommand();

  exec(command, (err: Error | null, stdout: string, stderr: string) => {
    if (err) {
      console.log(err.message);
      return;
    }

    const result: string = stdout.trim();

    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);

    process.stdout.write(result);

    const log = formatLog(result);

    logToFile(log);
  });
}

setInterval(logActivity, 60000);
