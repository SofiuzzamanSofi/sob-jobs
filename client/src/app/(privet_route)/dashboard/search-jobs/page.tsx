"use client";

import { FC } from 'react'
import JobCard from '@/components/JobCard';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useGetJobsQuery } from '@/redux/features/job/jobApi'
import { JobDataTypes } from '@/interfaceTypes/interfaceTypes';

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const router = useRouter();
    const { isLoading, data } = useGetJobsQuery();
    const JobDatas = data?.data ? [...data?.data].reverse() : [];
    console.log(router)
    console.log(new Date())
    if (isLoading) {
        return <Loading />;
    }
    else {
        return <div>
            <div>
                <div
                    className='bg-[#FFFAF4] p-5'
                >
                    <div>
                        <h1 className='text-2xl pt-2 text-center'>Search Jobs</h1>
                    </div>
                    <form className='rounded-lg grid place-items-center border'>
                        <div className='gap-2 grid lg:flex justify-between w-full border'>
                         
                            <div className='flex flex-col items-start border'>
                                <label htmlFor='jobTitle' className='ml-5'>
                                    Job Title
                                </label>
                                <input
                                    className="p-2 border rounded-md"
                                    type='text'
                                    id='jobTitle'

                                />
                            </div>
                            <div className='flex flex-col items-start border'>
                                <label htmlFor='companyName' className='ml-5'>
                                    Company Name
                                </label>
                                <input
                                    className="p-2 border rounded-md"
                                    type='text'
                                    id='companyName'

                                />
                            </div>
                            <div className='flex flex-col items-start border'>
                                <label htmlFor='location' className='ml-5'>
                                    Location
                                </label>
                                <input
                                    className="p-2 border rounded-md"
                                    type='text'
                                    id='location'

                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-between border">
                            <div className='flex  w-full max-w-xs'>
                                <input
                                    className='mr-3'
                                    type='checkbox'
                                    id='newer'
                                />
                                <label htmlFor='terms'>New Jobs Prefered</label>
                            </div>
                            <button

                                type='submit'
                                className='border border-black px-2 py-1 rounded-md hover:border-primary text-gray-600 hover:text-white hover:bg-primary hover:px-4 transition-all '
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <div
                className='grid md:grid-cols-2 gap-4'
            >
                {
                    data?.data?.length ?
                        JobDatas.map((jobData: JobDataTypes) => (
                            <JobCard key={jobData._id} jobData={jobData} />
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

export default page