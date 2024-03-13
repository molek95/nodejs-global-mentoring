import WithTime from "./with-time";

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));

const fetchData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

withTime.execute(fetchData, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
