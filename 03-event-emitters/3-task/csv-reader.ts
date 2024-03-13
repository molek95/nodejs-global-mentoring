import * as fs from "node:fs";
import csvtojson from "csvtojson";

class CSVReader {
  inputPath: string;

  constructor(inputPath: string) {
    this.inputPath = inputPath;
  }

  async read(): Promise<string[]> {
    const fileStream = fs.createReadStream(this.inputPath);
    const jsonObjects = await csvtojson().fromStream(fileStream);
    return jsonObjects.map((obj) => JSON.stringify(obj));
  }
}

export default CSVReader;
