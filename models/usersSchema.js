import Joi from "joi";
import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: false,
        default: ""
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        default: 0
    },
    url: {
        type: String,
        required: false,
        default: ""
    },
    gender: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false
    },
    budget: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: false,
        default: "user"
    }
})

export const Users = model("users", usersSchema)
export const validationUsers = (body) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().allow(""),
        username: Joi.string().required(),
        password: Joi.string().required(),
        age: Joi.number().allow(0),
        url: Joi.string().allow(""),
        gender: Joi.string().required(),
        isActive: Joi.boolean().allow(false),
        budget: Joi.number().required(),
        role: Joi.string().allow("user")
    })

    return schema.validate(body)
}