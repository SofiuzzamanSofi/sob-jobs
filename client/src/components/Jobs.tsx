"use client";

import { FC, Key } from 'react'
import { useGetJobsQuery } from '../redux/features/job/jobApi'
import JobCard from './JobCard';
import Loading from './Loading';
import { JobDataTypes } from '@/interfaceTypes/interfaceTypes';

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
                    data?.data?.length ?
                        data.data.map((jobData: JobDataTypes, index: Key | null | undefined) => (
                            <JobCard key={index} jobData={jobData} />
                        ))
                        :
                        <div>
                            <h1> No jobs yet on this website.</h1>
                        </div>
                }
            </div>
        </div>
    };
};

export default Jobs;