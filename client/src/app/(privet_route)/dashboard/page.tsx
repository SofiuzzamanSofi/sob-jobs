"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface pageProps {

};

const Dashboard = ({ }) => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter();
    const user = reduxStore.auth?.user;
    // console.log('reduxStore.:', reduxStore.auth.user);

    if ((!reduxStore?.auth?.isLoading && user?.email) && !user?.role) {
        return router.push('/dashboard/register');
    }
    else {
        return (
            <div
                className="flex justify-center items-center "
            >
                <div>
                    <div>
                        <h1 className="font-bold text-4xl md:text-7xl capitalize text-center py-1">Wellcome to Dashboard</h1>
                        <h1 className="text-lg text-center py-1">You are a: {reduxStore?.auth?.user?.role}</h1>
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
            </div>
        )
    };
};

export default Dashboard;