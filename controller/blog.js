import { Blogs, validationBlog } from "../models/blogSchema.js";

class BlogController {
    async get(req, res) {
        try {
            const blogs = await Blogs.find()
            if (!blogs.length) {
                return res.status(400).json({
                    msg: "Blog is not defined",
                    variant: "error",
                    payload: null
                });
            }
            res.status(400).json({
                msg: "All blogs",
                variant: "error",
                payload: blogs
            });
        } catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }
    }

    async create(req, res) {
        try {
            const { error } = validationBlog(req.body)
            if (error) {
                return res.status(400).json({
                    msg: error.details[0],
                    variant: "warning",
                    payload: null
                });
            }

            const blog = await Blogs.create(req.body)
            res.status(200).json({
                msg: "All Blogs",
                variant: "success",
                payload: blog
            });
        }
        catch {
            res.status(500).json({
                msg: "Server error",
                variant: "error",
                payload: null
            });
        }

    }
}

export default new BlogController()