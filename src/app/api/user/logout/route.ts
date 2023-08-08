// craete a api route that logout the user

import { NextResponse } from "next/server";

export async function GET(){
    try {
        // logout the user
        const responce = NextResponse.json({massage: "Logout successfull", success: true})
        responce.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})
        return responce

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}