import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';

// 1:50:12

interface SidebarItemProps {
    label: string;
    href?: string;
    onClick?: () => void;
    icon: IconType;
    auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    onClick,
    icon: Icon,
    auth
    
}) => {

    const {data: currentUser} = useCurrentUser();

    const loginModal = useLoginModal();

    const router = useRouter();

    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        } 
        if (auth && !currentUser) {
            loginModal.onOpen();
        } else if (href) {
            router.push(href);
        }
    }, [href, onClick, router, currentUser, loginModal, auth]);

    



    return (
        <div
            onClick={handleClick}
            className='flex flex-row items-center'
        >

            {/* Mobile */}
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
                <Icon size={28} color={"white"} />
            </div>

            {/* Desktop */}
            <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-opacity-10 hover:bg-slate-300 cursor-pointer">
                <Icon size={24} color={"white"} />
                <p className='hidden lg:block text-white text-xl'>{label}</p>
            </div>

        </div>
    )
}

export default SidebarItem;