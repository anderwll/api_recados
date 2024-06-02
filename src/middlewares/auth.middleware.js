import { users } from "../database/db"


export function authMiddleware(req, res, next) {
    const userId = req.headers.authorization

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Não autorizado!"
        })
    }

    const userFound = users.find(user => user.id === Number(userId))

    if (!userFound) {
        return res.status(401).json({
            success: false,
            message: "Não autorizado! Você não está logado."
        })
    }

    return next()
}