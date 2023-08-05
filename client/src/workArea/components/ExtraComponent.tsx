"use client";

import { FC, useEffect } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser, setUser, toggleLoading } from '../redux/features/auth/authSlice';

interface ExtraComponentProps {

}

const ExtraComponent: FC<ExtraComponentProps> = ({ }) => {

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.email) {
                dispatch(getUser(user?.email));
                // dispatch(setUser(user?.email));
                // console.log("user?.email:", user?.email);
            }
            else {
                // console.log("user?.email: Email nai");
                dispatch(toggleLoading());
            }
        });
    }, []);

    return <div
        style={{
            display: "none",
            marginTop: "-10px",
            marginBottom: "-10px",
        }}
    >

    </div>
}

export default ExtraComponent