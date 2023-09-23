"use client";

import JobCard from '@/components/JobCard';
import Loading from '@/components/Loading';
import { FC, useState, useEffect } from 'react';
import { JobDataTypes, serarchDataTypes } from '@/interfaceTypes/interfaceTypes';
import { useGetJobsQuery, useGetSearchJobsMutation } from '@/redux/features/job/jobApi';

interface pageProps {

};

const Page: FC<pageProps> = ({ }) => {

    const [titleText, setTitleText] = useState<string>("");
    const [companyText, setCompanyText] = useState<string>("");
    const [locationText, setLocationText] = useState<string>("");
    const [newOrOld, setnewOrOld] = useState<string>("new");
    const [isOpenClosed, setIsOpenClosed] = useState<string>("all");
    const { isLoading, data } = useGetJobsQuery();
    const JobDatas = data?.data ? [...data?.data].reverse() : [];
    const [jobBySearchData, { isError, isLoading: searchJobsIsLoading, data: searchJobsData }] = useGetSearchJobsMutation();

    const handleFromSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    useEffect(() => {
        const searchData: serarchDataTypes = {
            position: titleText?.trim(),
            companyName: companyText?.trim(),
            location: locationText?.trim(),
            isOpen: isOpenClosed,
            timestamp: newOrOld,
        }
        // console.log('searchData:',searchData);
        jobBySearchData(searchData);
    }, [titleText, companyText, locationText, newOrOld, isOpenClosed, jobBySearchData]);

    if (isLoading) {
        return <Loading />;
    }
    else {
        return (
            <div>
                <div
                    className='py-5'
                >
                    <div>
                        <h1 className='font-bold text-4xl pb-5 text-center dark:text-slate-300'>Search Jobs</h1>
                    </div>
                    <form
                        className='rounded-lg grid place-items-center border px-5'
                        onSubmit={handleFromSubmit}
                    >
                        <div className='flex gap-2 flex-col lg:flex-row lg:justify-between w-full border'>

                            <div className='flex flex-col items-start border'>
                                <label htmlFor='jobTitle' className='pt-2'>
                                    Job Title
                                </label>
                                <input
                                    className="p-2"
                                    type='text'
                                    id='jobTitle'
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}

                                />
                            </div>
                            <div className='flex flex-col items-start border'>
                                <label htmlFor='companyName' className='pt-2'>
                                    Company Name
                                </label>
                                <input
                                    className="p-2"
                                    type='text'
                                    id='companyName'
                                    value={companyText}
                                    onChange={(e) => setCompanyText(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col items-start border'>
                                <label htmlFor='location' className='pt-2'>
                                    Location
                                </label>
                                <input
                                    className="p-2"
                                    type='text'
                                    id='location'
                                    value={locationText}
                                    onChange={(e) => setLocationText(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="flex w-full justify-center lg:justify-end  items-center border pt-2 pb-1 gap-4 ">
                            <div className='flex gap-2  max-w-xs'>
                                <div>
                                    {/* <input
                                        className='m-1'
                                        type='checkbox'
                                        id='newer'
                                        checked={newOrOld}
                                        onClick={() => setnewOrOld((prv) => !prv)}
                                    />
                                    <label htmlFor='newer'>New Jobs</label>
                                    <label htmlFor="onldNew"></label> */}
                                    <select
                                        name="onldNew" id="onldNew" className='border'
                                        value={newOrOld}
                                        onChange={(e) => setnewOrOld(e.target.value)}
                                    >
                                        <option disabled value="">Chose One</option>
                                        <option value="new">New First</option>
                                        <option value="old">Old First</option>
                                    </select>
                                </div>
                                <div>
                                    {/* <input
                                        className='m-1'
                                        type='checkbox'
                                        id='older'
                                        checked={!newOrOld}
                                        onClick={() => setnewOrOld((prv) => !prv)}
                                    />
                                    <label htmlFor='older'>Old Jobs</label> */}
                                    <select
                                        name="openClosed" id="openClosed" className='border'
                                        value={isOpenClosed}
                                        onChange={(e) => setIsOpenClosed(e.target.value)}
                                    >
                                        <option disabled value="">Chose One</option>
                                        <option value="all">All Jobs</option>
                                        <option value="open">Opene Jobs</option>
                                        <option value="closed">Closed Jobs</option>
                                    </select>
                                </div>
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
                <div
                    className='grid gap-4'
                >
                    {
                        data?.data?.length &&
                            searchJobsData?.data ?
                            searchJobsData?.data.map((jobData: JobDataTypes) => (
                                <JobCard key={jobData._id} jobData={jobData} />
                            ))
                            :
                            <div>
                                <h1>NO Maches Or Pls Wait Or Error.</h1>
                            </div>
                    }
                </div>
            </div>
        )
    };
};

export default Page;