"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";



interface pageProps {

}

const Dashboard = ({ }) => {

    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter()

    if (!reduxStore?.auth?.role) {
        return router.push("/dashboard/register");
    }
    else {
        return (
            <div
                className='mt-10'
            >
                <div
                    className="flex justify-center items-center "
                >
                    <div>
                        <div>
                            <h1 className="text-xl text-center py-1">Wellcome to Dashboard</h1>
                            <h1 className="text-xl text-center py-1">You are a: {reduxStore?.auth?.role}</h1>
                        </div>
                        <div
                            className="pt-10"
                        >
                            <h6 className='text-center'>
                                More Feature is comming soon...
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default Dashboard;