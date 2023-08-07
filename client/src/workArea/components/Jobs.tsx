"use client";

import { FC } from 'react'
import { useGetJobsQuery } from '../redux/features/job/jobApi'
import JobCard from './JobCard';
import Loading from './Loading';

interface jobsProps {

}

const Jobs: FC<jobsProps> = ({ }) => {
    const { isLoading, data } = useGetJobsQuery();
    if (isLoading) {
        return <Loading />;
    }
    else {
        return <div>
            <div>
                <h1 className='text-xl py-5 text-center'>All jobs</h1>
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
        </div>
    };
};

export default Jobs;