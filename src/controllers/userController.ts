import { UsersModel } from "../model/userModel";

const getAllUsers = (req: any, res: any) => {
  UsersModel.find()
    .then((result: any) => res.send(result))
    .catch((err: any) => console.log(err));
};

const addUser = (req: any, res: any) => {
  const user = new UsersModel({
    name: "Ali veli",
    password: 2124142,
  });

  user
    .save()
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export { getAllUsers, addUser };
