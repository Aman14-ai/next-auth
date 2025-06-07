"use server"
import {connect} from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userMode";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request:NextRequest)
{
    try 
    {
        const reqBody = await request.json();
        const { email, password }= await reqBody;
        // verification
        if(!email)
        {
            console.log("Email is required for loggin in");
            return NextResponse.json({error: "Email is required , inside backend." }, {status:400})
        }
        if(!password)
        {
            console.log("Password is required for loggin in , inside backend");
            return NextResponse.json({error: "Password is required" }, {status:400})
        }

        // check if user exists
        const user = await User.findOne({email});
        if(!user)
        {
            console.log("user does not exists for logging in");
            return NextResponse.json({error:"User does not exists."}, {status:400});
        }
        // check password
        const validatedPassword = await bcrypt.compare(password,user?.password);
        if(!validatedPassword)
        {
            return NextResponse.json({error:"Invalid Password"},{status:400});
        }

        // create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn:"1d"});
        const response = NextResponse.json({
            message:"Logged in successfully. Please wait...",
            success:true
        })
        response.cookies.set("token", token, {
            httpOnly:true,

        })
        return response;
    } 
    catch (error) 
    {
        console.log("Error in backend while logging in");
        console.log(error);
        return NextResponse.json({error:"Error while logging in."} , {status:500});
    }
}


connect()