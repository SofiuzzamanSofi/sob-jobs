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
                <div>
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
                    <h1> _id: &nbsp;
                        {
                            data?.data?._id
                        }
                    </h1>
                    <h1> Address: &nbsp;
                        {
                            data?.data?.address
                        }
                    </h1>
                    <Link
                        href={{
                            pathname: `chat/${reduxStore.auth.user?._id}-${data?.data?._id}`,
                            query: { messageEmail: `${reduxStore.auth.user?.email}-${data?.data?.email}` },
                        }}
                    >
                        <button>
                            Message
                        </button>
                    </Link>

                </div>

            }
        </div>
    )
};

export default Page;