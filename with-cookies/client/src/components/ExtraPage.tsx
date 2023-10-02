"use client";

import { getMe } from '@/redux/features/auth/authSlice';
import { AppDispatch } from '@/redux/store';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';


interface ExtraPageProps {

};

const ExtraPage: FC<ExtraPageProps> = ({ }) => {

    const dispatch: AppDispatch = useDispatch();

    // preline ui css  library 
    useEffect(() => {
        require("preline");
    }, []);

    // if relode or open browser first time get user from db 
    useEffect(() => {
        dispatch(getMe());
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