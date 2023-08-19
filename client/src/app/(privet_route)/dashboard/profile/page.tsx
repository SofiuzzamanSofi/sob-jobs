"use client";

import { AppDispatch } from '@/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react'
import { useDispatch } from 'react-redux';

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams?.get('email')
    console.log("email:", email)


    // every time relode and get user/register user from DATABASE 
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user?.email) {
    //             dispatch(getUser(user?.email));
    //             // dispatch(setUser(user?.email));
    //             // console.log("user?.email:", user?.email);
    //         }
    //         else {
    //             // console.log("user?.email: Email nai");
    //             dispatch(toggleLoading());
    //         }
    //     });
    // }, [dispatch]);
    return (
        <div>
            Page
        </div>
    )
}

export default Page;