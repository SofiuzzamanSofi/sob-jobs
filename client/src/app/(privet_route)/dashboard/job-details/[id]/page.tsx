"use client";

import { FC } from 'react'
import JobDetails from '@/components/jobDetails/JobDetails';
import { useJobByIdQuery } from '@/redux/features/job/jobApi';
import Loading from '@/components/Loading';

interface pageProps {
    params: {
        id: string;
    }
};

const Page: FC<pageProps> = ({ params }) => {

    const { data, isLoading, isError } = useJobByIdQuery(params.id, {
        //  pollingInterval: 2000 
    }
    );

    console.log('params.id:', params.id);
    console.log('data:', data);

    return <div>
        {
            !params.id ?
                <Loading />
                :
                data?.data?._id && <JobDetails jobData={data?.data} />
        }
    </div>
}

export default Page