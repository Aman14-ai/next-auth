import React from 'react'
import User from '@/src/models/userMode';
import { connect } from '@/src/dbConfig/dbConfig';


connect();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const user = await User.findById(id) || null;

    


    return (
        <div className='text-2xl text-center'>
            
            
                {
                    user ? (
                        <div className='text-xl text-center p-4 rounded-2xl bg-gradient-to-r from-[#0f172a] to-[#1e293b] shadow-lg px-8'>
                            <h1 className='text-3xl mb-2'>User Details</h1>
                            <p>Name: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Admin: {user?.isAdmin ? "Yes" : "No"}</p>
                            
                        </div>
                    ) : (
                        <p>User not found</p>
                    )
                }
            
        </div>
    )
}

export default page
