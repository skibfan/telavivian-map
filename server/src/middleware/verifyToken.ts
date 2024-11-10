import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const {ACCESS_TOKEN_SECRET} = process.env

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers['x-access-token'] as string
    if (!token) {
        res.status(401).json({message: "unauthorized"})
        return 
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET as string, (error: any, decoded: any) => {

        if (error) {
            res.status(403).json({ message: "Forbidden", error: error.message })
            return
        }
        
        const {id, email} = decoded as {id: number; email: string}
        req.userinfo = { id, email }
        next()
    })
}
