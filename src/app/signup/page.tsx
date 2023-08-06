"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function Signup() {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async () => {
        try {
            await axios.post("/api/user/signup", user).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error.response);
              });
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <>
            <div className="flex items-center justify-center w-[100vw] h-[100vh]">
                <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 w-[28rem]">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                        <p className="text-sm dark:text-gray-400">Sign Up to access your account</p>
                    </div>
                    <form action="" className="space-y-12">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">Username</label>
                                <input type="text" name="username" id="username" placeholder="username" value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                                <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm">Password</label>
                                </div>
                                <input type="password" name="password" id="password" placeholder="*****" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                            </div>

                        </div>
                        <div className="space-y-2">
                            <div>
                                <button type="button" className={`w-full px-8 py-3 font-semibold rounded-md ${buttonDisabled? "dark:bg-indigo-500": "dark:bg-indigo-400"} dark:text-gray-900`} disabled={buttonDisabled? true:false} onClick={onSignup}  >
                                    { buttonDisabled ? "Disabled" : "Sign Up" }
                                </button>
                            </div>
                            <p className="px-6 text-sm text-center dark:text-gray-400">Alreaddy have an account?
                                <Link rel="noopener noreferrer" href="/login" className="hover:underline dark:text-indigo-400"> Login</Link>.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};