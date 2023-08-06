"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }


    return (
        <>
           <div className="flex items-center justify-center w-[100vw] h-[100vh]">
           <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 w-[28rem]">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                    <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
                </div>
                <form action="" className="space-y-12">
                    <div className="space-y-4">

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" value={user.email} onChange={(e) => { setUser({...user, email: e.target.value})}}  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                        
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" value={user.password} onChange={(e) => { setUser({...user, password: e.target.value})}}  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>

                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="button" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-indigo-400 dark:text-gray-900">Sign In</button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
                            <Link rel="noopener noreferrer" href="/signup" className="hover:underline dark:text-indigo-400"> Sign Up</Link>.
                        </p>
                    </div>
                </form>
            </div>
           </div>
        </>
    );
};