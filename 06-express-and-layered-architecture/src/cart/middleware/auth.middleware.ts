import { users } from "../../models/user.entity";

export async function checkIfUserExists(req: any, res: any, next: any) {
  const userId = req.header("x-user-id");

  if (!userId) {
    return res.status(400).send("User ID is not provided");
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  req.user = user;
  next();
}
