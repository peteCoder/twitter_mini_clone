import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify';
import Input from '../Input';
import Modal from '../Modal'

interface RegisterModalProps {
    // props goes here
}

const RegisterModal: React.FC<RegisterModalProps> = ({

}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();


    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {

            setIsLoading(true);

            // await signUp Request Here...
            await axios.post('/api/register', {
                name,
                username,
                email,
                password,
            });

            toast.success("Account created.")
            
            // Sign In User after success
            signIn("credentials", {email, password});

            registerModal.onClose();
        } catch(error) {
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false);
        }


    }, [registerModal, name, username, email, password]);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
        

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
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                disabled={isLoading}
            />
            <Input
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
            <p>Already have an account?</p>
            <span
                onClick={onToggle}
                className='text-white cursor-pointer hover:underline
            '>Log in</span>

        </div>
    );

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an Account"
            onSubmit={onSubmit}
            onClose={registerModal.onClose}
            body={bodyContent}
            actionLabel="Sign Up"
            footer={footerContent}
        />
    );

}


export default RegisterModal