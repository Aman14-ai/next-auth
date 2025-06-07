import {connect} from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userMode";



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log("Token received for email verification:");
        console.log(token);
// $2b$10$tdZi0.SCyET7ffpkeyzCkeHBuBqq3A9F2JjnullutPIjmKuwRCiOW'
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        
        console.log(user);
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        

        

        // user.isVerfied = true;
        // user.verifyToken = undefined;
        // user.verifyTokenExpiry = undefined;
        // await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully. Please wait...",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}