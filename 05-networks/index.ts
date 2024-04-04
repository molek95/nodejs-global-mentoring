import * as http from "http";
import * as url from "url";
import { StringDecoder } from "string_decoder";
import router from "./user/routes";
import { IncomingMessageWithBody } from "./models/inccoming-message-with-body.interface";

const server = http.createServer(
  (req: IncomingMessageWithBody, res: http.ServerResponse) => {
    const parsedUrl = url.parse(req.url!, true);
    const paths: string[] = parsedUrl.pathname!.split("/").filter(Boolean);
    const method = req.method!.toUpperCase();

    const idIndex = paths.findIndex((item) => !isNaN(Number(item)));
    if (idIndex >= 0) {
      req.params = { id: paths[idIndex] };
      paths[idIndex] = ":id";
    }

    const routeKey = `${paths.join("/")}:${method}`;

    let buffer: Buffer[] = [];
    let decoder = new StringDecoder("utf-8");

    req.on("data", (chunk) => buffer.push(Buffer.from(decoder.write(chunk))));
    req.on("end", () => {
      console.log({ routeKey });
      console.log({ router });
      req.body = Buffer.concat(buffer).toString();
      router[routeKey]
        ? router[routeKey](req, res)
        : generateNotFoundResponse(res);
      res.end();
    });
  }
);

function generateNotFoundResponse(res: http.ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(404);
  res.end('{"message": "Not found"}');
}

server.listen(8000, "localhost", () => console.log("Listening on port 8000"));
