"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const defaultOptionsForToast: any = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    };
    const router = useRouter();
    const [buttonDisable, setButtonDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false);
        }
        else {
            setButtonDisable(true);
        }
    }, [user]);

    const onLogin = async () => {
        try 
        {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Logged In Successfully.");
            //console.log(response.data);
            toast.success(response.data.message,defaultOptionsForToast)
            setTimeout(() => {
                router.push('/profile');
            },2500)
        } 
        catch (error: any) 
        {
            console.log("Error while loggin in while clicking the button")
            console.log(error);
            toast.error(error.response.data.error, defaultOptionsForToast);
        }
        finally
        {
            setLoading(false);
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='flex justify-center items-center min-h-screen '>
                <div className='border-2 sm:w-[100vw] md:max-w-md lg:max-w-lg sm:h-[100vh]   md:h-full border-cyan-400/30 p-5 sm:p-8 rounded-xl backdrop-blur-sm bg-blue-900/30 w-full animate-fade-in-up animate-delay-100 shadow-[0_8px_32px_0_rgba(10,80,150,0.3)] hover:shadow-[0_8px_32px_0_rgba(10,180,220,0.5)] transition-all duration-500 ease-in-out hover:border-cyan-400/50 '>
                
                    <h1 className='text-2xl font-bold font-serif tracking-wider text-cyan-200 mb-4 animate-text-focus-in bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text'>
                        {loading ? "Loading..." : "Login"}
                    </h1>
                    <hr className='border-cyan-400/20 mb-6  animate-scale-in-hor-left' />

                    <div className='space-y-6'>

                        <div className='animate-fade-in animate-delay-400'>
                            <label htmlFor="email" className='block text-sm font-medium text-cyan-100/90 mb-1 transition-all duration-300 hover:text-cyan-300'>
                                Email
                            </label>
                            <input
                                
                                className='signup-input'
                                type="text"
                                id='email'
                                value={user.email}
                                placeholder='aman@ai.com'
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>

                        <div className='animate-fade-in animate-delay-500'>
                            <label htmlFor="password" className='block text-sm font-medium text-cyan-100/90 mb-1 transition-all duration-300 hover:text-cyan-300'>
                                Password
                            </label>
                            <input
                                className='signup-input'
                                type="password"
                                id='password'
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder='••••••••'
                            />
                        </div>

                        <button
                            disabled={buttonDisable}
                            onClick={onLogin}
                            className='cursor-pointer w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md
                                  text-white font-medium tracking-wide
                                  hover:from-cyan-400 hover:to-blue-500
                                  transition-all duration-300
                                  shadow-lg hover:shadow-cyan-500/30
                                  animate-fade-in animate-delay-600 sm:max-w-md'>
                            {buttonDisable ? "Cannot Login" : "Login"}
                        </button>
                        <div className='flex items-center justify-center'>
                            <Link href={"/signup"} className='text-cyan-500/49 text-sm tracking-wider font-semibold'>Create Account ?</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
