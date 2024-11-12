import { _addFavorite, _getFavorites, _getUserByEmail, _registerNewU, _removeFavorite} from "../models/model"
import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const {ACCESS_TOKEN_SECRET} = process.env

export const addFavorite = async (req: Request, res: Response) => {
    const {favorite_item} = req.body
    const email = req.userinfo?.email

    if (email) {
        try {
            const response = await _getUserByEmail(email)
            const user_id = response.id
            
        
        if(!user_id) {
             res.status(404).json({message: 'no such user...'})
             return
        }
        
        const data = await _addFavorite(user_id, favorite_item)
        res.json(data)

        } catch (error) {
            console.error("Failed to add favorite data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else { 
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export const removeFavorite = async (req: Request, res: Response) => {
    const {favorite_item} = req.body
    const email = req.userinfo?.email

    if (email) {
        try {
            const response = await _getUserByEmail(email)
            const user_id = response.id
            if(!user_id) {
                res.status(404).json({message: 'no such user...'})
                return
            }
            
            const data = await _removeFavorite(user_id, favorite_item)
            res.json(data)

        } catch (error) {
            console.error("Failed to delete favorite data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else { 
        res.status(500).json({ error: "Internal Server Error" });
    }
}










export const getFavorites = async (req: Request, res: Response)  => {
    
    const email = req.userinfo?.email
    
    if(email ){
        try {
            const data = await _getFavorites(email)
            res.json(data)
        } catch (error) {
            console.error("Failed to get favorites data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else { 
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const registerNewU = async (req: Request, res: Response)  => {
    const {email, username, password} = req.body
    try {
        const data = await _registerNewU(email, username, password)
        res.json(data)
    } catch (error) {
        console.error("Failed to register new user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body
    
    try {
        const user = await _getUserByEmail(email)
        
        if(!user) {
             res.status(404).json({message: 'no such user...'})
             return
        }
        
        const passwordMatch = await bcrypt.compare(password+'', user.password)
        if (!passwordMatch) {
             res.status(404).json({message: 'wrong password...'})
             return
        }
        

        const accessToken = jwt.sign(
            {userid: user.id, email: user.email},
            ACCESS_TOKEN_SECRET as string, 
            {expiresIn: "60s"}
        )
        
        res.cookie("token", accessToken, {
            maxAge: 60 * 1000,
            httpOnly: true
        })

        
        res.json({
            message: "Login successfully",
            user: {userid: user.id, email: user.email},
            token: accessToken
        })
        return

    } catch (error) {
        console.log("login failed:", error);
         res.status(500).json({message: "internal server error"})
         return
    }
}



export const logOutUser = (req: Request, res: Response) => {
    res.clearCookie('token')
    req.cookies.token = null
    delete req.cookies.token
    delete req.headers['x-access-token']
    
    res.sendStatus(200)
}

export const verifyAuth = (req: any, res: any) => {
    const {id, email} = req.userinfo

    const accessToken = jwt.sign(
        {id, email},
        ACCESS_TOKEN_SECRET as string,
        { expiresIn: "60s" }
    )

    res.cookie("token", accessToken, {
        maxAge: 60 * 1000,
        httpOnly: true
    })

    res.json({
        message: "Verify Auth",
        user: {id, email},
        accessToken
    })
}