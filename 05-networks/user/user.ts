import { IncomingMessage, ServerResponse } from "http";
import { USERS, User } from "./users.const";
import { IncomingMessageWithBody } from "../models/inccoming-message-with-body.interface";
import * as http from "http";

const createUser = (req: IncomingMessageWithBody, res: ServerResponse) => {
  console.log("create");
  const newUser: User = JSON.parse(req.body as any);
  newUser.id = USERS.length + 1;
  USERS.push(newUser);
  res.statusCode = 201;
  res.end(JSON.stringify(newUser));
};

const getUser = (req: IncomingMessageWithBody, res: ServerResponse) => {
  console.log("get");
  if (!req.url) {
    res.statusCode = 400;
    res.end("Bad Request");
    return;
  }
  const id = req.url.split("/")[2];
  const userId = parseInt(id);
  const currentUser = USERS.find((user) => user.id === userId);
  if (currentUser) {
    const { hobbies, ...response } = currentUser;
    res.statusCode = 200;
    res.end(JSON.stringify(response));
  } else {
    res.statusCode = 404;
    res.end();
  }
};

const getUsers = (req: IncomingMessageWithBody, res: ServerResponse) => {
  const usersFiltered = USERS.map((user) => {
    const { hobbies, ...response } = user;
    return response;
  });
  res.statusCode = 200;
  res.end(JSON.stringify(usersFiltered));
};

const updateUser = (req: IncomingMessageWithBody, res: http.ServerResponse) => {
  const userId = req.params.id;

  if (!userId) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid user id" }));
    return;
  }

  const updatedUser: Partial<User> = JSON.parse(req.body as any);

  let user = USERS.find((user: User) => user.id === parseInt(userId));

  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  user = Object.assign(user, updatedUser);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User updated successfully", user }));
};

const deleteUser = (req: IncomingMessageWithBody, res: http.ServerResponse) => {
  const userId = parseInt(req.params.id);
  const index = USERS.findIndex((user) => user.id === userId);
  console.log({ index });
  if (index !== -1) {
    USERS.splice(index, 1);
    res.statusCode = 200;
  } else {
    res.statusCode = 404;
  }
  res.end();
};

const getUserHobbies = (req: IncomingMessageWithBody, res: ServerResponse) => {
  const userId = parseInt(req.params.id);
  const user = USERS.find((user) => user.id === userId);
  if (user) {
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.statusCode = 200;
    res.end(JSON.stringify(user.hobbies));
  } else {
    res.statusCode = 404;
    res.end();
  }
};

const updateUserHobbies = (
  req: IncomingMessageWithBody,
  res: ServerResponse
) => {
  const userId = parseInt(req.url!.split("/")[1] || "");
  const updatedHobbies: string[] = JSON.parse(req.body as any);

  const user = USERS.find((user) => user.id === userId);
  if (user && updatedHobbies) {
    user.hobbies = updatedHobbies;
    const { hobbies, ...response } = user;

    res.statusCode = 200;
    res.end(JSON.stringify(response));
  } else {
    res.statusCode = 404;
    res.end();
  }
};

export {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserHobbies,
  updateUserHobbies,
};
