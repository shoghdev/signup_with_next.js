import db from 'better-sqlite3'
import { IUser, type InputUser } from './type'

const sql = new db('auth.db')

export const getUserByLogin = (login:string):(IUser|null) => {
    const user = sql.prepare("SELECT * FROM users where login = ?").get(login)
    if(user){
        return user as IUser
    }
    return null
}

export const getAllUsers = () => {
    return sql.prepare("SELECT * FROM users").all()
}

export const insertuser = (user: InputUser): db.RunResult => {
    return sql.prepare(`
        INSERT INTO users (name,surname,login,password)
        VALUES (@name,@surname,@login,@password)
    `).run(user)
}