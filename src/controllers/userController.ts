import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel";
import { loginValidation, registerValidation } from "../validation";

//Register controller and user validation

const register = async (req: any, res: any) => {
  //Validate the data before we a user

  const { error }: any = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //email check if the email already exist in db we get message
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exist");
  }
  //Hash passwords

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const registeredUser = await user.save(); // saving to db with user.save();
    res.send({ user: user._id }); //sends id of user
  } catch (err) {
    res.status(400).json({ msg: "Register failed" });
  }
};

const login = async (req: any, res: any) => {
  //lets validate the data before we a user

  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //checking email if the email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .send("Email or password is wrong or email not exist!");
  }
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const hidingToken: any = process.env.TOKEN_SECRET;
  const token = jwt.sign({ _id: user._id }, hidingToken);
  res.header("auth-token", token).send(token);
};

const getPosts = (req: any, res: any) => {
  res.json({
    posts: {
      title: "my first post",
      description: "random data you shouldnt access",
    },
  });
};

export { register, login, getPosts };
