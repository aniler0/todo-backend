import { User } from "../model/userModel";
import registerValidation from "../validation";

const register = async (req: any, res: any) => {
  const { error }: any = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exist");
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const registeredUser = await user.save();
    res.send(registeredUser);
  } catch (err) {
    res.status(400).json({ msg: "Register failed" });
  }
};

const login = (req: any, res: any) => {
  res.send("login");
};

export { register, login };
