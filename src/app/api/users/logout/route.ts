import { NextResponse } from "next/server";

export async function GET()
{
    try 
    {
        const response = NextResponse.json({
            message:"Logged out successfully.Please wait...",
            success:true
            },
            {
                status: 200,
            })
        // clear the token cookie
        response.cookies.set("token", "", {
            httpOnly:true,
            expires: new Date(0) // Set the cookie to expire immediately
        });
        return response;
    } 
    catch (error) 
    {
        console.log("Error in backend while logging out");
        console.log(error);
        return NextResponse.json({error:"Error while logging out."} , {status:500});    
    }
}