"use client";

import Loading from '@/components/Loading';
import { useGetApplicantQuery } from '@/redux/features/applicant/applicantApi';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react'
import { useSelector } from 'react-redux';

interface PageProps {

};

const Page: FC<PageProps> = ({ }) => {

    const searchParams = useSearchParams();
    const email = searchParams?.get('email')
    const reduxStore = useSelector((state: RootState) => state);
    const { isLoading, data } = useGetApplicantQuery(email!);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            {
                data?.data &&
                <div className='py-5'>
                    <h1> FullName: &nbsp;
                        {
                            data?.data?.firstName
                        }
                        {
                            data?.data?.lastName
                        }
                    </h1>
                    <h1> Email: &nbsp;
                        {
                            data?.data?.email
                        }
                    </h1>
                    <h1> Role: &nbsp;
                        {
                            data?.data?.role
                        }
                    </h1>
                    <h1> Gender: &nbsp;
                        {
                            data?.data?.gender
                        }
                    </h1>
                    <h1> Address: &nbsp;
                        {
                            data?.data?.address
                        }
                    </h1>
                    <h1> Country: &nbsp;
                        {
                            data?.data?.country
                        }
                    </h1>
                    <Link
                        href={{
                            pathname: `chat/${reduxStore.auth.user?._id}-${data?.data?._id}`,
                            query: { messageEmail: `${reduxStore.auth.user?.email}-${data?.data?.email}` },
                        }}
                    >
                        <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                            Message
                        </button>
                    </Link>

                </div>

            }
        </div>
    )
};

export default Page;