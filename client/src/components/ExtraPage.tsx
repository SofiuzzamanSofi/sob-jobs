"use client";

import { getMe, getMeWithOutCookies } from '@/redux/features/auth/authSlice';
import { AppDispatch } from '@/redux/store';
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
        dispatch(getMeWithOutCookies());
    }, [dispatch]);



    // useEffect(() => require("preline"), []);

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