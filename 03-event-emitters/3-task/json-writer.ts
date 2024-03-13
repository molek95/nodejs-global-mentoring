import * as fs from "node:fs";
import path from "node:path";

class JSONWriter {
  outputPath: string;

  constructor(outputPath: string) {
    this.outputPath = outputPath;
  }

  createDir(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  write(data: string[]) {
    return new Promise((resolve, reject) => {
      const dirPath = path.dirname(this.outputPath);
      this.createDir(dirPath);

      const writeStream = fs.createWriteStream(this.outputPath);
      writeStream.on("error", (error: Error) =>
        reject(`Error writing to TXT file: ${error}`)
      );

      data.forEach((line) => writeStream.write(line + "\n"));
      writeStream.end();

      writeStream.on("close", () => resolve(true));
    });
  }
}

export default JSONWriter;
