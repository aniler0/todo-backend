import jwt from "jsonwebtoken";

export function verify(req: any, res: any, next: any) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const hidingToken: any = process.env.TOKEN_SECRET;
    const verified = jwt.verify(token, hidingToken);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
