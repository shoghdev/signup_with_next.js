import axios from "axios";
import { IResponse, type InputUser } from "./type";

const Axios = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true
})

export const handleSignup = async (user: InputUser):Promise<IResponse>=> {
    const response = await Axios.post("/api", user)
    return response.data
}
