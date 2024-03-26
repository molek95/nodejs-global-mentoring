import * as http from "http";
import { IncomingMessageWithBody } from "../models/inccoming-message-with-body.interface";
import {
  createUser,
  getUser,
  deleteUser,
  getUserHobbies,
  updateUserHobbies,
  getUsers,
  updateUser,
} from "./user";

type RouteHandlers = {
  [routeKey: string]: (
    req: IncomingMessageWithBody,
    res: http.ServerResponse
  ) => void;
};

const router: RouteHandlers = {
  "api/users:POST": createUser,
  "api/users:GET": getUsers,
  "api/users/:id:DELETE": deleteUser,
  "api/users/:id/hobbies:GET": getUserHobbies,
  "api/users/:id/hobbies:PATCH": updateUserHobbies,
  "api/users/:id:PATCH": updateUser,
};

export default router;
