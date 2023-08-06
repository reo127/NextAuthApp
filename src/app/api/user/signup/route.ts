import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        //check if user already exists
        const userExist = await User.findOne({ email })
        if (userExist) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        console.log(user);

        if (user) {
            return NextResponse.json({ msg: "User created..", user })
        }
        return NextResponse.json({ error: "User not created..." }, { status: 400 })


    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

