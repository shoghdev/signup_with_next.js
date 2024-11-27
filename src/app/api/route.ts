import { NextRequest } from "next/server";
import { getAllUsers, insertuser } from "../_lib/model";
import { handleSignup } from "../_lib/actions";

export const GET = () => {
    const result = getAllUsers()
    return Response.json(result)
}

export const POST = async (req:NextRequest) => {
    const user = await req.json()
    if(user) {
        handleSignup(user)
        const result = insertuser(user)
        return Response.json(result)
    }
}