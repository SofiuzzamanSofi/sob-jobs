"use client";

import Loading from "@/components/Loading";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface pageProps {

};

const Dashboard = ({ }) => {

    const { isLoading, user } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    // console.log('reduxStore.:', reduxStore.auth.user);

    useEffect(() => {
        if (!isLoading && !user?.role) {
            router.push("/dashboard/register");
        };
    }, [user?.role, isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div
            className="flex justify-center items-center "
        >
            {
                !user?.role ?
                    <div>
                        <p>No Info Found.</p>
                    </div>
                    :
                    <div>
                        <div>
                            <h1 className="font-bold text-4xl md:text-7xl capitalize text-center py-1">Wellcome to Dashboard</h1>
                            <h1 className="text-lg text-center py-1">You are a: {user?.role}</h1>
                        </div>
                        <div
                            className="pt-8"
                        >
                            <h1> FullName: &nbsp;
                                {
                                    user?.firstName
                                }
                                {
                                    user?.lastName
                                }
                            </h1>
                            <h1> Email: &nbsp;
                                {
                                    user?.email
                                }
                            </h1>
                            <h1> Role: &nbsp;
                                {
                                    user?.role
                                }
                            </h1>
                            <h1> Gender: &nbsp;
                                {
                                    user?.gender
                                }
                            </h1>
                            <h1> Address: &nbsp;
                                {
                                    user?.address
                                }
                            </h1>
                            <h1> Country: &nbsp;
                                {
                                    user?.country
                                }
                            </h1>
                            <h6 className='text-center'>
                                More Feature is comming soon...
                            </h6>
                        </div>
                    </div>
            }
        </div>
    )
};

export default Dashboard;