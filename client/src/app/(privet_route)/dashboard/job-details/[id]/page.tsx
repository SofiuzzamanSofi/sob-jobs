"use client";


import JobDetails from '@/components/JobDetails';
import { useJobByIdQuery } from '@/redux/features/job/jobApi';
import { usePathname } from 'next/navigation';
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    const pathname = usePathname() || "";
    const pathNameTotalArray = pathname.split("/")
    const id = pathNameTotalArray[pathNameTotalArray.length - 1];
    const { data, isLoading, isError } = useJobByIdQuery(id, { pollingInterval: 2000 });

    return <div>
        {
            data?.data?.companyName && <JobDetails jobData={data?.data} />
        }
        <h1>{data?.data?.companyName}</h1>
    </div>
}

export default page