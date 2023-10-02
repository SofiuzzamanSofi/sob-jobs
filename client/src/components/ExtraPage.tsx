"use client";

import { auth } from '@/firebase/firebase.config';
import { getMe } from '@/redux/features/auth/authSlice';
import { AppDispatch } from '@/redux/store';
import { onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';


interface ExtraPageProps {

};

const ExtraPage: FC<ExtraPageProps> = ({ }) => {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        require("preline");
    }, []);

    // useEffect(() => {
    //     dispatch(getMe());
    // }, [dispatch]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (runningUser) => {
            if (runningUser?.email) {
                dispatch(getMe(runningUser.email));
                console.log('runningUser.email:', runningUser.email);
            }
        })
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <div
            style={{
                display: "none"
            }}
        >

        </div>
    );
};

export default ExtraPage;