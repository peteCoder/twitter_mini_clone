import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FaFeather } from 'react-icons/fa';
import useLoginModal from '@/hooks/useLoginModal';

const SidebarTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const onClick = useCallback(() => {
        loginModal.onOpen(); 
    }, [loginModal]);


    return (
        <div onClick={onClick}>
            {/* Mobile */}
            <div className="
                mt-6
                lg:hidden
                rounded-full
                h-14
                w-14
                flex
                items-center
                justify-center
                bg-sky-500
                hover:bg-opacity-50
                transition
                cursor-pointer
            ">
                <FaFeather size={24} color={'white'} />
            </div>

            {/* Desktop */}
            <div className='
                mt-6
                hidden
                lg:block
                px-4
                py-2
                bg-sky-500
                rounded-full
                hover:bg-opacity-90
                cursor-pointer
                transition
            '>
                <p className='hidden lg:block text-center text-white font-semibold text-[20px]'>
                    Tweet
                </p>
            </div>

        </div>
    )
}

export default SidebarTweetButton