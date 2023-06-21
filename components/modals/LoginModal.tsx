import { signIn }  from 'next-auth/react'

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import { toast } from 'react-hot-toast';

interface LoginModalProps {
    // props goes here
}

const LoginModal: React.FC<LoginModalProps> = ({

}) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {

            setIsLoading(true);

            // await signIn Request Here...
            await signIn("credentials", {email, password});
            toast.success("Login successful");

            loginModal.onClose();
        } catch(error) {
            toast.error("Invalid credentials");
        } finally {
            setIsLoading(false);
        }


    }, [loginModal, email, password]);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
        

    }, [isLoading, registerModal, loginModal]);


    // Html body content
    const bodyContent = (
        <div className='
            flex flex-col gap-4
        '>
            <Input 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                disabled={isLoading}
            />
            <Input 
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                disabled={isLoading}
            />
        </div>
    );

    // Html footer content
    const footerContent = (
        <div className="
            text-neutral-500
            text-center
            mt-4
            flex
            items-center
            justify-center
            flex-col
            lg:flex-row
            gap-[0.25rem]
        ">
            <p>First time using Twitter?</p>
            <span
                onClick={onToggle}
                className='text-white cursor-pointer hover:underline
            '>Sign up</span>

        </div>
    );



    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Sign In"
            onSubmit={onSubmit}
            onClose={loginModal.onClose}
            body={bodyContent}
            actionLabel="Login"
            footer={footerContent}
        />
    );
}

export default LoginModal