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

//get tasks

const getTasks = async (req: any, res: any) => {
  const userId: string = req.user._id;

  await User.findById(userId)
    .select("tasks")
    .then((data: any) => {
      if (!data)
        res.status(404).send({ msg: "Not found user with id " + userId });
      else res.send(data);
    })
    .catch((err: any) =>
      res.status(500).send({ msg: "Error when getting data" })
    );
};

const newTask = async (req: any, res: any, next: any) => {
  const userId: string = req.user._id;
  //------------------------------------
  await User.findById(userId)
    .select("tasks")
    .then((data: any) => {
      if (data) {
        data.tasks.push({
          title: req.body.title,
          completed: req.body.completed,
        });
        data.save(() => {
          res.send(data);
        });
      } else {
        res.send({ title: "empty" });
      }
    })
    .catch((err: any) => {
      if (err) res.send(err);
    });
};

const updateTask = async (req: any, res: any) => {
  const userId: string = req.user._id;
  const taskId: string = req.params.id;
  await User.findById(userId)
    .select("tasks")
    .then((data: any) => {
      let updatedData: any;
      if (!data) res.status(404).send({ msg: "post not found" });
      else {
        updatedData = data.tasks.id(taskId);
        updatedData.completed = req.body.completed;
        data.save((err: string, doc: any) => {
          if (err) res.status(500).json(err);
          else {
            res.status(200).json(updatedData);
          }
        });
      }
    });
};
const deleteTask = async (req: any, res: any) => {
  const userId: string = req.user._id;
  const taskId: string = req.params.id;
  await User.findById(userId)
    .select("tasks")
    .then((data: any) => {
      let updatedData: any;
      if (!data) res.status(404).send({ msg: "post not found" });
      else {
        updatedData = data.tasks.id(taskId).remove();
        data.save((err: string, doc: any) => {
          if (err) res.status(500).json(err);
          else {
            res.status(204).json(null);
          }
        });
      }
    });
};

export { register, login, getTasks, newTask, updateTask, deleteTask };
