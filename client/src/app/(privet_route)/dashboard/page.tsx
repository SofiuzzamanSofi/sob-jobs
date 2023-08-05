"use client";

import { RootState } from '@/workArea/redux/store';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Jobs from '@/workArea/components/Jobs';


interface pageProps {

}

const Dashboard = ({ }) => {
    const reduxStore = useSelector((state: RootState) => state);
    const router = useRouter()
    // console.log("reduxStore?.auth l15:", reduxStore?.auth)

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
                            className="flex gap-2"
                        >
                            <Link
                                href='/dashboard/add-job'
                                className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
                            >
                                Add Job
                            </Link>
                            <Link
                                href='/dashboard/add-job'
                                className='hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full'
                            >
                                Add Job
                            </Link>
                        </div>
                        <div
                            className="pt-10"
                        >
                            <h6>
                                More Feature is comming soon...
                            </h6>
                            <Jobs />
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default Dashboard;