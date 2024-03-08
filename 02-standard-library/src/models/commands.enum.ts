export enum Command {
  windows = "powershell \"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"",
  unix = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1",
}
