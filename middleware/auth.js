import jwt from "jsonwebtoken"

export const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({
            msg: "token is not defined",
            variant: "error",
            payload: null
        })
    }

    jwt.verify(token.split(" ")[1], "sh@e$r31/0%4", function (err, decoded) {
        if (err) {
            return res.status(401).json({
                msg: "token is not suitable",
                variant: "error",
                payload: null
            })
        }
        else {
            console.log(decoded);
            next()
        }
    })
}