export interface User {
  id: number;
  name: string;
  email: string;
  hobbies: string[];
}

export const USERS = [
  {
    id: 1,
    name: "Ann",
    email: "ann@google.com",
    hobbies: ["books", "sport", "dancing"],
  },
  {
    id: 2,
    name: "Ben",
    email: "ben@google.com",
    hobbies: ["series", "sport"],
  },
];
