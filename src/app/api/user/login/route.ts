import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log("phase one => ",reqBody);

        // check user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400})
        }

        console.log("phase 2");

        // Check the password
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log("phase 3");

        // create jwt token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = await jwt.sign(tokenData, "thisisnextjsauthappiambuilding", {expiresIn: "1d"})
        console.log("phase 4");
        const responce = NextResponse.json({massage: "Login successfull", success: true})
        console.log("phase 5");
        
        responce.cookies.set("token", token, {httpOnly: true})
        console.log("phase 6");
        // return NextResponse.json({msg: "Login successfull", responce})
        return responce
        


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}