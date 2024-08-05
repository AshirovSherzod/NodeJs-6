import { Users, validationUsers } from "../models/usersSchema.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

class UsersController {
    async get(req, res) {
        try {
            console.log("hello");
            const users = await Users.find().select("-password")
            if (!users.length) {
                return res.status(400).json({
                    msg: "User is not defined",
                    variant: "error",
                    payload: null
                });
            }
            res.status(200).json({
                msg: "All users",
                variant: "success",
                payload: users
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }

    async create(req, res) {
        try {
            let { error } = validationUsers(req.body)
            if (error) {
                return res.status(400).json({
                    msg: error.details[0].message,
                    variant: "error",
                    payload: null
                })
            }

            const existBlog = await Users.exists({ username: req.body.username })
            if (existBlog) {
                return res.status(400).json({
                    msg: "Username has been used before",
                    variant: "warning",
                    payload: null
                })
            }

            req.body.password = await bcrypt.hash(req.body.password, 10)
            const users = await Users.create(req.body)
            res.status(201).json({
                msg: "User is created",
                variant: "success",
                payload: users
            })
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            })
        }
    }

    async signin(req, res) {
        try {
            const { username, password } = req.body;
            console.log(username)
            if (!username || !password) {
                return res.status(400).json({
                    msg: "Username and password are required",
                    variant: "error",
                    payload: null
                });
            }

            const user = await Users.findOne({ username });
            if (!user) {
                return res.status(401).json({
                    msg: "Invalid username or password",
                    variant: "error",
                    payload: null
                });
            }

            bcrypt.compare(password, user.password, function (err, response) {
                const token = jwt.sign({ _id: user._id }, "sh@e$r31/0%4")
                if (response) {
                    res.status(200).json({
                        msg: "Sign-in successful",
                        variant: "success",
                        payload: { user, token }
                    });
                }
                else {
                    return res.status(400).json({
                        msg: "Invalid username or password",
                        variant: "error",
                        payload: null
                    });
                }

            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const existBlog = await Users.findById(id)
            if (!existBlog) {
                return res.status(400).json({
                    msg: "User is not found",
                    variant: "warning",
                    payload: null
                })
            }
            const users = await Users.findByIdAndDelete(id, { new: true })

            res.status(200).json({
                msg: "User is deleted",
                variant: "success",
                payload: users
            })
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const users = await Users.findByIdAndUpdate(id, req.body, { new: true }).select("-password")

            res.status(200).json({
                msg: "blog is updated",
                variant: "success",
                payload: users
            })
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            })
        }
    }
}

export default new UsersController()