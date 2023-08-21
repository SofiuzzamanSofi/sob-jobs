"use client";

import { FC, useState, useEffect } from 'react'
import JobCard from '@/components/JobCard';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useGetJobsQuery, useGetSearchJobsMutation } from '@/redux/features/job/jobApi'
import { JobDataTypes, serarchDataTypes } from '@/interfaceTypes/interfaceTypes';

interface pageProps {

}

const Page: FC<pageProps> = ({ }) => {

    const [titleText, setTitleText] = useState<string>("");
    const [companyText, setCompanyText] = useState<string>("");
    const [locationText, setLocationText] = useState<string>("");
    const [newOrOld, setnewOrOld] = useState<string>("new");
    const [isOpenClosed, setIsOpenClosed] = useState<string>("all");
    const router = useRouter();
    const { isLoading, data } = useGetJobsQuery();
    const JobDatas = data?.data ? [...data?.data].reverse() : [];
    const [jobBySearchData, {isError, isLoading: searchJobsIsLoading, data: searchJobsData}] = useGetSearchJobsMutation();
    // console.log(router)
    // console.log(new Date());



const handleFromSubmit =(e: { preventDefault: () => void; }) => {
    e.preventDefault();
}

    // console.log('newOrOld:', newOrOld);
    useEffect(() => {
        const trimmedtitleText = titleText?.trim();
        const trimmedcompanyText = titleText?.trim();
        const trimmedlocationText = titleText?.trim();
      
            const searchData : serarchDataTypes = {
                position: titleText?.trim(),
                companyName: companyText?.trim(),
                location: locationText?.trim(),
                isOpen: isOpenClosed,
                timestamp: newOrOld,
            }
            // console.log('searchData:',searchData);
            jobBySearchData(searchData);      
    }, [titleText, companyText, locationText, newOrOld, isOpenClosed,jobBySearchData]);

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
                    <form
                    className='rounded-lg grid place-items-center border px-5'
                    onSubmit={handleFromSubmit}
                    >
                        <div className='gap-2 grid lg:flex lg:justify-between justify-center w-full border'>

                            <div className='flex flex-col items-start border'>
                                <label htmlFor='jobTitle' className='ml-5'>
                                    Job Title
                                </label>
                                <input
                                    className="p-2 border rounded-md"
                                    type='text'
                                    id='jobTitle'
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}

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
                                    value={companyText}
                                    onChange={(e) => setCompanyText(e.target.value)}
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
            </div>
            <div
                className='grid md:grid-cols-2 gap-4'
            >
                {
                    data?.data?.length &&
                    searchJobsData?.data ?
                     searchJobsData?.data.map((jobData: JobDataTypes) => (
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

export default Page;