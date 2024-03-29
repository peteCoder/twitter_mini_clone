import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';
import Button from './Button';

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}


const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {
    const registerModel = useRegisterModal();
    const loginModal = useLoginModal();

    const {data: currentUser} = useCurrentUser();
    const {mutate: mutatePost} = usePosts();

    // State
    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const onSubmit = useCallback( async () => {

    //     try {
    //         setIsLoading(true);
    //         await axios.post('/api/posts', { body });
    //         toast.success("Toast was successful.")
    //         setBody("");
    //         mutatePost();
    //     } catch (error) {
    //         toast.error("Something went wrong.")
    //         console.log(error);
    //     } finally {
    //         setIsLoading(false);
    //     }

    // }, [body, mutatePost])


    return (
        <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
            <div className='py-8'>
                <h1 className='text-white text-2xl text-center mb-4 font-bold'>Welcome to Twitter</h1>
                <div className='flex flex-row justify-center items-center gap-4'>
                    {/* <Button label='Login' onClick={loginModal.onOpen} />
                    <Button label='Register' onClick={registerModel.onOpen} /> */}
                </div>
            </div>
        </div>
    )
}

export default Form;