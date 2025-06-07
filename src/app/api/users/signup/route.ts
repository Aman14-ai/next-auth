"use server"
import {connect} from "@/src/dbConfig/dbConfig";
import { sendEmail } from "@/src/helpers/mailer";
import User from "@/src/models/userMode";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest)
{
    try
    {
        const reqBody = await request.json();
        console.log("request body while signing up : ");
        console.log(reqBody)
        const {username , email , password} = await reqBody;
        

        // if user exists
        const user = await User.findOne({email});
        if(user)
        {
            console.log("User already exists in database no need to signup . Please move to login.");
            return NextResponse.json({error:"User already exists. Proceed for login."}, {status:400});
        }

        // user does not exists need to save in dbs first encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        console.log("New user")
        console.log(newUser)
        const savedUser = await newUser.save();

        console.log("user has been saved to database after signing up.", savedUser);

        // send verification email
        await sendEmail({email, emailType:"VERIFY", userId:savedUser._id});
        console.log("Verification email sent to user.");

        const userone = await User.findOne({email});
        const userVerificationToken = userone?.verifyToken


        return NextResponse.json({
            message:"Signup successfully.",
            success:true,
            userVerificationToken,
            savedUser,
        },
        {status:200}
    );

    }
    catch(error:any)
    {
        console.log("Error while signing up , " + error);
        return NextResponse.json({error:error.message}, {status:500});
    }
}



connect();