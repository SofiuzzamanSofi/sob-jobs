"use client";

import Link from "next/link";
import Image from 'next/image';
import { BsPeople } from 'react-icons/bs';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import meeting from "@/assets/meeting.jpg";
import React, { FC, useState } from "react";
import AlertModal from "@/components/shared/AlertModal";
import { JobDataTypes } from '@/interfaceTypes/interfaceTypes';
import { useJobByIdQuery, useJobIsOpenMutation } from '@/redux/features/job/jobApi';
import CompanyInfoSecondPara from "@/components/jobDetails/CompanyInfoSecondPara";
import CompanyInfoFirstPara from "@/components/jobDetails/CompanyInfoFirstPara";


interface pageProps {
    params: {
        id: string
    }
};

const Page: FC<pageProps> = ({ params }) => {

    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const reduxStore = useSelector((state: RootState) => state);
    const [jobIsOpen, { isLoading: jobIsOpenLoading, isError: jobIsOpenError, isSuccess: jobIsOpenSuccess }] = useJobIsOpenMutation();
    const { data, isLoading, isError } = useJobByIdQuery(params.id);

    const {
        email,
        position,
        companyName,
        experience,
        workLevel,
        employmentType,
        salaryRange,
        location,
        noOpening,
        isOpen,
        overview,
        skills,
        requirements,
        responsibilities,
        _id,
        applicants,
        questionAns
    } = data?.data || {} as JobDataTypes;
    const submitIsOpenJobs = () => {
        if (_id && reduxStore.auth.user?._id && reduxStore.auth.user?.email) {
            const isOpenData = {
                jobId: _id,
                isOpen,
                userId: reduxStore.auth.user._id,
                userEmail: reduxStore.auth.user.email,
            }
            // console.log("isOpenData:", isOpenData);
            jobIsOpen(isOpenData);
            setIsOpenModal((prev) => !prev);
        }
    }

    const tdClass = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"

    const applicantsReverse = applicants ? [...applicants].reverse() : [];

    if (reduxStore.auth.user?.role !== "Employer") {
        router.push("/");
        return;
    };


    return (
        <div className='py-5 lg:grid grid-cols-12 gap-5'>
            <div className='lg:col-span-8'>
                <div className='h-80 rounded-xl overflow-hidden'>
                    <Image className='h-full w-full object-cover' src={meeting} alt='' />
                </div>

                {/* mobile show lg:[1024px]hidden  */}  {/* company info */}
                <div className="mt-5 lg:hidden ">
                    <div className='flex justify-between'>
                        <div
                            className='bg-white dark:bg-gray-800 text-primary dark:text-darkPrimary dark:border-gray-700 rounded-md space-y-5'
                        >
                            <CompanyInfoSecondPara
                                companyName={companyName || ""}
                                email={email || ""}
                            />
                        </div>
                        <div
                            className='bg-white dark:bg-gray-800 text-primary dark:text-darkPrimary dark:border-gray-700 rounded-md space-y-5'
                        >
                            <CompanyInfoFirstPara
                                experience={experience || ""}
                                workLevel={workLevel || ""}
                                employmentType={employmentType || ""}
                                salaryRange={salaryRange || ""}
                                location={location || ""}
                            />
                        </div>
                    </div>
                    <hr className='mb-5 mt-2' />
                </div>

                {/* jbo title  open closed  */}
                <div className='space-y-5'>
                    <div className='flex justify-between items-center mt-5'>
                        <div className='text-md font-medium'>
                            <div>
                                <span className="text-primary dark:text-darkPrimary">Job Status:</span> &nbsp;
                                <button
                                    className="border border-gray-300 dark:border-gray-700 px-2 py-1 rounded-md  hover:border-primary hover:text-white  hover:bg-primary hover:px-4 transition-all"
                                    onClick={() => setIsOpenModal((prev) => !prev)}
                                >
                                    {isOpen ? "Open" : "Closed"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-5'>
                        <h1 className=''>
                            <span className="text-primary dark:text-darkPrimary text-md font-medium">  Number of openings:</span> &nbsp;
                            <span>{noOpening}</span>
                        </h1>
                        <div className='text-primary dark:text-darkPrimary text-md font-medium flex items-center gap-2'>
                            <><BsPeople /> <span className="text-slate-700 dark:text-slate-400">{applicants?.length}</span> applicants</>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-5'>
                        <h1 className='text-xl font-semibold text-primary dark:text-darkPrimary'>{position}</h1>
                    </div>
                </div>

                {/* table of application list  */}
                <div>
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Email</th>
                                                <th>Message</th>
                                                <th>Details</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {
                                            applicantsReverse &&
                                            applicantsReverse.map((applicant, index) => (
                                                <tbody key={index} className="divide-y divide-gray-200 dark:divide-gray-700">
                                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <td className={tdClass}>{index + 1}</td>
                                                        <td className={tdClass}>{applicant.userEmail}</td>
                                                        <td className={tdClass}>
                                                            <Link
                                                                href={{
                                                                    pathname: `/dashboard/chat/${reduxStore.auth.user?._id}-${applicant.userId}`,
                                                                    query: { messageEmail: `${reduxStore.auth.user?.email}-${applicant.userEmail}` },
                                                                }}
                                                            >
                                                                <button>
                                                                    Message
                                                                </button>
                                                            </Link>
                                                        </td>
                                                        <td className={tdClass}>
                                                            <Link
                                                                href={`/dashboard/profile?email=${applicant?.userEmail}`}
                                                            >
                                                                Profile
                                                            </Link>
                                                        </td>
                                                        <td className={`${tdClass} cursor-not-allowed`}>Delete</td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* right side bar  */} {/* hidden lg:[1024px]show*/}   {/* company info */}
            <div className='hidden lg:block lg:col-span-4'>
                {/* first para  */}
                <div
                    className='bg-white dark:bg-gray-800 text-primary dark:text-darkPrimary border border-gray-200 dark:border-gray-700 rounded-md p-5 space-y-5 mb-2.5'
                >
                    <CompanyInfoSecondPara
                        companyName={companyName || ""}
                        email={email || ""}
                    />
                </div>
                {/* second para  */}
                <div
                    className='bg-white dark:bg-gray-800 text-primary dark:text-darkPrimary border border-gray-200 dark:border-gray-700 rounded-md p-5 space-y-5 mt-2.5'
                >
                    <CompanyInfoFirstPara
                        experience={experience || ""}
                        workLevel={workLevel || ""}
                        employmentType={employmentType || ""}
                        salaryRange={salaryRange || ""}
                        location={location || ""}
                    />
                </div>
            </div>
            <AlertModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                submitIsOpenJobs={submitIsOpenJobs}
                isOpen={isOpen}
            />
        </div>
    );
};

export default Page;