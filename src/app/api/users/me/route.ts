import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userMode";
import { connect } from "@/src/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest)
{
    try 
    {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password -createdAt -updatedAt");
        if (!user) 
        {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }
        return NextResponse.json({
            message: "User data retrieved successfully.Please wait...",
            data:user
        }, { status: 200 });

    } 
    catch (error:any) 
    {
        console.error("Error in backend /api/users/me:", error);
        return NextResponse.json({
            error: error.message || "Failed to get user data"
        }, { status: 500 });
        
    }
}