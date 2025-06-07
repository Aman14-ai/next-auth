"use client"
import axios from "axios"
import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import Link from "next/link"



export default function VerifyEmail() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const token = searchParams.get("token");

    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyEmail", { token });
            console.log("Response from backend while verifying email");
            console.log(response);
            toast.success(response.data.message || "Email ");
            setIsVerified(true);
            setError(false);
        }
        catch (error: any) {
            console.error("Error verifying email:", error);
            toast.error(error?.data?.error || "Failed to verify email");
            setError(true);

        }
    }


    useEffect(() => {
        if (token) {
            verifyUserEmail();
        }
    }, [])

    return (
         <Suspense fallback={<div className="text-center mt-8">Loading verification...</div>}>
            
        
        <div className="text-center ">
            <ToastContainer />
            <h1 className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] shadow-lg p-6 text-3xl font-semibold">Email Verification</h1>
            <p className="mt-4 font-sans "><span className="font-serif font-semibold tracking-wider">Token</span>: <span className="text-white/80">{token ? `${token}` : "No token"}</span></p>

            {isVerified ? (
                <>
                    <p className="text-green-500 text-center mt-4 text-lg font-medium">
                        Email verified successfully!
                    </p>
                    <Link href="/login">
                        <button className="cursor-pointer mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                            Go to Login
                        </button>
                    </Link>
                </>
            ) : error ? (
                <p className="text-red-500 mt-4">Failed to verify email. Please try again.</p>
            ) : (
                <p className="text-blue-500 mt-4"></p>
            )}


        </div>
        </Suspense>
    )
}