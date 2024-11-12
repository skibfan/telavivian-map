import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken'

const {ACCESS_TOKEN_SECRET} = process.env
type payload = {
    id: number, 
    email: string
}


export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token || req.headers['x-access-token'] as string
    
    if (!token) {
      res.status(401).json({message: "unauthorized"})
      return
    }
    // TODO: dont really undesrtand the decoded
    jwt.verify(token, ACCESS_TOKEN_SECRET as string, (error: VerifyErrors | null, decoded: string | JwtPayload | undefined | payload) => {

        if (error) {
          res.status(403).json({ message: "Forbidden", error: error.message })
          return
        }

        const {id, email} = decoded as {id: number; email: string}
        req.userinfo = { id, email }
        
        next()
        
        
    })
}
