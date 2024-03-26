import * as http from "http";

export interface IncomingMessageWithBody extends http.IncomingMessage {
  body?: string;
  params?: any;
}
