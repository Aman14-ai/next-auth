import { NextRequest } from "next/server"
import jwt from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest) => {
    try 
    {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("Token not found");
        }
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log("Decoded Token:");
        console.log(decodedToken);
        return decodedToken?.id || null;
    } 
    catch (error:any) 
    {
        console.error("Error in getDataFromToken:", error);
        throw new Error(error.message || "Failed to get data from token");
        
    }
}