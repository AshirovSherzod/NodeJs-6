import express from "express"
import BlogController from "../controller/blog.js"
import UsersController from "../controller/users.js"
import { auth } from "../middleware/auth.js"
const router = express.Router()

//blogs
router.get("/api/blogs", [auth], BlogController.get)
router.post("/api/blogs", BlogController.create)

//users
router.get("/api/users", [auth], UsersController.get)
router.post("/api/users", UsersController.create)
router.post("/api/users/signin", UsersController.signin)
router.delete("/api/users/:id", [auth], UsersController.delete)
router.put("/api/users/:id", [auth], UsersController.update)



export default router