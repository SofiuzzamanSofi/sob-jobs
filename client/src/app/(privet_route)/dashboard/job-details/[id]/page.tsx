"use client";

import { FC } from 'react'
import JobDetails from '@/components/JobDetails';
import { useJobByIdQuery } from '@/redux/features/job/jobApi';

interface pageProps {
    params: {
        id: string;
    }
};

const Page: FC<pageProps> = ({ params }) => {

    const { data, isLoading, isError } = useJobByIdQuery(params.id, { pollingInterval: 2000 });

    return <div>
        {
            data?.data?.companyName && <JobDetails jobData={data?.data} />
        }
    </div>
}

export default Page