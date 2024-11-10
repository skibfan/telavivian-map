import {db} from '../config/data.js'
import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
    const saltRounds = 10
    const hashedPass = await bcrypt.hash(password, saltRounds)
    return hashedPass
}

const checkPass = async (password: string, hashedPass: string) => {
    const flag = await bcrypt.compare(password, hashedPass)
    return flag
}


export const _registerNewU = async (email: string, username: string, password: string) => {
    let trx
    try {
        password = await hashPassword(password)
        trx = await db.transaction()
        
        const newUser = await db('telavivian_users').insert({email, username, password}, ["id", "email", "username", "password"]).transacting(trx)
        
        await trx.commit()
        console.log(`user ${username} created successfuly`);
        return newUser
        
    } catch (error) {
        console.log('user not created');
        console.log(error);
        if (trx) await trx.rollback() 
        throw(error)
    }
}

// _loginUser

export const _getFavorites = async (username: string) => {

    try {
        const user = await db('telavivian_users').select('id').where({ username }).first()
        const userID = user.id
        return await db('telavivian_favorites').select('favorite_item').where({user_id: userID})
    } catch (error) {
        console.log(`cannot get favorites for ${username}`);
        console.log(error);
        throw(error)
    }
}


export const _addFavorite = async (username: string, favorite_item: number) => {
    let trx
    

    try {
        trx = await db.transaction()
        const user = await db('telavivian_users').select('id').where({ username }).first()
        const userID = user.id
        
        const newFavorite = await db('telavivian_favorites').insert({user_id: userID, favorite_item}, ['id','user_id', 'favorite_item']).transacting(trx)
        await trx.commit()
        console.log(`favorite ${newFavorite} added successfuly`);
        return newFavorite
        
    } catch (error) {
        console.log('favorite not added');
        console.log(error);
        if (trx) await trx.rollback() 
        throw(error)
    }
}


export const _getUserByEmail = async (email: string) => {
    try {
        return await db('telavivian_users')
        .select('id', 'email', 'password')
        .where({email: email.toLowerCase()})
        .first()
    } catch (error) {
        console.log('no such user, failed to login');
        console.log(error);
        throw(error)
    }
}