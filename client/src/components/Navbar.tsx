"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getUser, setUser, signOutReducer, toggleLoading } from "../redux/features/auth/authSlice";

const Navbar = () => {

    const pathname = usePathname() ?? "";
    const pathNameTotalArray = pathname.split("/");
    const pathNameArray = pathNameTotalArray.filter((path) => path !== "");
    const reduxStore = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();

    // every time relode and get user/register user from DATABASE 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.email) {
                dispatch(getUser(user?.email));
                // dispatch(setUser(user?.email));
                console.log("From Navbar:", user?.email);
            }
            else {
                // console.log("user?.email: Email nai");
                dispatch(toggleLoading());
            }
        });
    }, [dispatch]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("log out clicked.");
                dispatch(signOutReducer());
            })
            .catch((error) => {
                // Handle error if needed
            });
    };

    if (pathNameArray.includes("sign-up") || pathNameArray.includes("sign-in")) {
        return null;
    }
    else {
        return (
            <nav className={`border-2  h-14  w-full z-[20] ${pathname === "/" ? null : "bg-white"}`}>
                <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
                    <li className="flex-auto font-semibold text-2xl">
                        <Link href="/">Sob-Jobs</Link>
                    </li>
                    <li>
                        <Link
                            className="border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                            href="/jobs"
                        >
                            Jobs
                        </Link>
                    </li>
                    <li>
                        {reduxStore.auth?.email && (
                            <Link
                                href="/dashboard"
                                className="border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                            >
                                Dashboard
                            </Link>
                        )}
                    </li>

                    <li>
                        {reduxStore.auth?.email ? (
                            <button
                                className="border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                                onClick={handleSignOut}
                                title={reduxStore.auth.email}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all"
                            >
                                Sign In
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        );
    };
};

export default Navbar;