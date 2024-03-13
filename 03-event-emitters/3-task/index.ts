import CSVReader from "./csv-reader";
import JSONWriter from "./json-writer";

(async () => {
  try {
    const csvReader = new CSVReader("./3-task/csv/data.csv");
    const jsonWriter = new JSONWriter("./3-task/json/data.txt");

    const data = await csvReader.read();
    await jsonWriter.write(data as string[]);
  } catch (error) {
    console.error(error);
  }
})();
