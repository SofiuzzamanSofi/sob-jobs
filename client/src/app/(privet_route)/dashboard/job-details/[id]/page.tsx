"use client"

"use client";

import JobDetails from '@/workArea/components/JobDetails';
import { useJobByIdQuery } from '@/workArea/redux/features/job/jobApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    const router = useRouter();
    const pathname = usePathname() ?? '';
    const pathNameTotalArray = pathname.split("/")
    const id = pathNameTotalArray[pathNameTotalArray.length - 1];
    const { data, isLoading, isError } = useJobByIdQuery(id);

    console.log(id, data);

    return <div>
        {
            data?.data?.companyName && <JobDetails jobData={data?.data} />
        }
        <h1>{data?.data?.companyName}</h1>
    </div>
}

export default page