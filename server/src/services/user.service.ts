import express from "express";
import * as fs from "fs";
import * as path from "path";

const pathUser = path.join("public/users.json");

class UserService {
  constructor() {}
  getAllUser(req: express.Request, res: express.Response) {
    const result: string = fs.readFileSync(pathUser, "utf8").toString();
    const data = JSON.parse(result);
    res.status(200).json(data);
  }
  getUserById(req: express.Request, res: express.Response) {
    const result: string = fs.readFileSync(pathUser, "utf8").toString();
    const data = JSON.parse(result);
    const id = +req.params.id;
    const user = data.find((item: any) => item.id === id);
    res.status(200).json(user);
  }
  postNewUser(req: express.Request, res: express.Response) {
    const result: string = fs.readFileSync(pathUser, "utf8").toString();
    const data = JSON.parse(result);
    const body = req.body;
    const newUser = {
      id: data[data.length - 1].id + 1,
      name: body.name,
      desc: body.desc,
    };
    data.push(newUser);
    fs.writeFileSync(pathUser, JSON.stringify(data), "utf8");
    res.status(201).json("Create user successfully");
  }
  deleteUserById(req: express.Request, res: express.Response) {
    const result: string = fs.readFileSync(pathUser, "utf8").toString();
    const data = JSON.parse(result);
    const id = +req.params.id;
    const newData = data.filter((item: any) => item.id !== id);
    fs.writeFileSync(pathUser, JSON.stringify(newData), "utf8");
    res.status(201).json("Delete user successfully");
  }
  patchUserById(req: express.Request, res: express.Response) {
    const result: string = fs.readFileSync(pathUser, "utf8").toString();
    const data = JSON.parse(result);
    const id = +req.params.id;
    let newData = data.map((item: any) => {
      if (item.id === id) {
        return {
          id: id,
          name: req.body.name,
          desc: req.body.desc,
        };
      }
      return item;
    });

    fs.writeFileSync(pathUser, JSON.stringify(newData), "utf8");
    res.status(200).json("Update user successfully");
  }
  sortById(req: express.Request, res: express.Response) {
    const result: string = fs.readFileSync(pathUser, "utf8").toString();
    const data = JSON.parse(result);
    if (req.query.sort === "asc") {
      const newData = data.sort((a: any, b: any) => a.id - b.id);
      res.status(200).json(newData);
    }
    if (req.query.sort === "desc") {
      const newData = data.sort((a: any, b: any) => b.id - a.id);
      res.status(200).json(newData);
    }
  }
}

export default UserService;
