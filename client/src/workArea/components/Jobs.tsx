"use client";

import { FC } from 'react'
import { useGetJobsQuery } from '../redux/features/job/jobApi'
import JobCard from './JobCard';

interface jobsProps {

}

const Jobs: FC<jobsProps> = ({ }) => {

    const { isLoading, data } = useGetJobsQuery();
    console.log("data", data);


    return <div>
        <div>
            <h1>
                This is All jobs Pages dgs.
            </h1>
        </div>
        <div
            className='grid md:grid-cols-2 gap-4'
        >
            {
                data?.data?.length &&
                data.data.map((jobData, index) => (
                    <JobCard key={index} jobData={jobData} />
                ))
            }
        </div>
        <div>

        </div>
    </div>
}

export default Jobs