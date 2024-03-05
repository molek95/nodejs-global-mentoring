import { exec } from "child_process";
import * as fs from "fs";

const logFile: string = "activityMonitor.log";

function logActivity(): void {
  let command;
  if (process.platform === "win32") {
    command =
      "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
  } else if (process.platform === "linux" || process.platform === "darwin") {
    command = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
  }

  exec(command, (err: Error | null, stdout: string, stderr: string) => {
    if (err) {
      (process.stderr as any).write(err.message);
      return;
    }

    let result: string = stdout.trim();

    if ((process.stdout as any).clearLine) {
      (process.stdout as any).clearLine();
      (process.stdout as any).cursorTo(0);
    }

    process.stdout.write(result);

    let log: string = Math.floor(Date.now() / 1000) + " : " + result + "\n";

    fs.appendFile(logFile, log, (err: Error | null) => {
      if (err) {
        console.log(err.message);
      }
    });
  });
}

setInterval(logActivity, 100);
setInterval(() => process.stdout.write("\n"), 60 * 1000);
