import React from 'react'
// import logo from '/assets/images/logo.png'; // For static images in public
// import Image from 'next/image';
// import { Bell } from 'lucide-react';
import { useSelector } from "react-redux";

export default function Header() {

    const user = useSelector((state) => state.auth);
    
    const id = user?.id;
    const email = user?.email;
    const role = user?.role;

    return (
        <div className='bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-2 rounded-lg '>

            <div className='max-w-7xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between'>
                <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100'>
                    Dashboard
                </h1>
                <div className='flex items-center space-x-3 sm:space-x-6'>
                    <span className='hidden sm:block text-gray-100 font-medium'>
                        User id: {id}

                    </span> <span className='hidden sm:block text-gray-100 font-medium'>
                        {email}
                    </span>

                    <span className='hidden sm:block text-gray-100 font-medium'>
                        Role: {role}
                    </span>
                </div>
            </div>
        </div>
    )
}