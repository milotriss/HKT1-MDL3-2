import express from "express";
import UserService from "../services/user.service";

const userService = new UserService();
const userController = express.Router();

userController
  .route("/")
  .get(userService.getAllUser)
  .post(userService.postNewUser)
  .get(userService.sortById)

userController.route("/:id")
.delete(userService.deleteUserById)
.get(userService.getUserById)
.patch(userService.patchUserById)

export default userController;
