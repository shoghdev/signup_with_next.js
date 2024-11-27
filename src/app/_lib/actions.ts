"use server"

import { redirect } from "next/navigation"
import { getUserByLogin, insertuser } from "./model"


export const handleSignup = async (form:FormData)=> {
    const name = form.get("name") as string
    const surname = form.get("surname") as string
    const login = form.get("login") as string
    const password = form.get("password") as string

    if(!name.trim() || !surname.trim() || !login.trim() ||!password.trim()) {
        return {message:"Please fill all the fields"}
    }

    if(password.length < 6) {
        return {message:"Password is too short!!"}
    }

    const found = getUserByLogin(login)

    if(found) {
        return {message:"Login is buzy"}
    }

    const result = insertuser({login,password,name,surname})
    
    if(result.changes == 1) {
        return redirect("/")
    } else {
        return {message:"Internal server error"}
    }
}