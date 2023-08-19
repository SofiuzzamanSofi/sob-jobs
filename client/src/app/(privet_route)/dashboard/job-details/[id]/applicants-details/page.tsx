"use client";

import React, { useState } from "react";
import { JobDataTypes } from '@/interfaceTypes/interfaceTypes';
import { useJobByIdQuery, useJobIsOpenMutation } from '@/redux/features/job/jobApi';
import Image from 'next/image';
import meeting from "@/assets/meeting.jpg";
import { FC } from 'react'
import { BsArrowRightShort, BsPeople } from 'react-icons/bs';
import AlertModal from "@/components/shared/AlertModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";


interface pageProps {
    params: {
        id: string
    }
}

const page: FC<pageProps> = ({ params }) => {

    // const router = useRouter();
    // const {id} = router.query;
    // console.log("id:", id)
    // const pathname = usePathname() || "";
    // const pathNameTotalArray = pathname.split("/")
    // const id = pathNameTotalArray[pathNameTotalArray.length - 2];
    // console.log("pathNameTotalArray:", pathNameTotalArray, "ddddd:", id)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const reduxStore = useSelector((state: RootState) => state);
    const [jobIsOpen, { isLoading: jobIsOpenLoading, isError: jobIsOpenError, isSuccess: jobIsOpenSuccess }] = useJobIsOpenMutation();
    const { data, isLoading, isError } = useJobByIdQuery(params.id);
    // console.log("iddddddd data in applicans name:::", data);
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
            console.log("isOpenData:", isOpenData);
            jobIsOpen(isOpenData);
            setIsOpenModal((prev) => !prev);
        }
    }

    return (
        <div className='pt-14 grid grid-cols-12 gap-5'>
            <div className='col-span-9 mb-10'>
                <div className='h-80 rounded-xl overflow-hidden'>
                    <Image className='h-full w-full object-cover' src={meeting} alt='' />
                </div>
                <div className='space-y-5'>
                    <div className='flex justify-between items-center mt-5'>
                        <h1 className='text-primary text-md font-medium'>
                            <span>
                                Job Status: &nbsp;
                                <span
                                    className="font-bold text-lg border rounded-md bg-primary/10 p-5 text-primary px-2 py-1 hover:cursor-pointer"
                                    onClick={() => setIsOpenModal((prev) => !prev)}
                                >
                                    {isOpen ? "Open" : "Closed"}
                                </span>
                            </span>
                        </h1>
                    </div>
                    <div className='flex justify-between items-center mt-5'>
                        <h1 className='text-primary text-md font-medium'>
                            Number of openings: {noOpening}
                        </h1>
                        <div className='text-primary text-md font-medium flex items-center gap-2'>
                            <BsPeople /> {applicants?.length} applicants
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-5'>
                        <h1 className='text-xl font-semibold text-primary'>{position}</h1>
                    </div>

                </div>
                <div>
                    <table className="table-auto border">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                            {
                                applicants?.map((applicant, index) => (
                                    <tr key={index} className="my-2">
                                        <td>{index + 1}</td>
                                        <td>{applicant.userEmail}</td>
                                        <td>
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
                                        <td>
                                            <Link
                                                href={{
                                                    pathname: `/dashboard/profile?email=${applicant?.userEmail}`,
                                                    // query: loginUserInfoUser
                                                }}
                                            >

                                                Profile
                                            </Link>
                                        </td>
                                        <td>Delete</td>
                                    </tr>
                                ))
                            }

                        </thead>
                    </table>
                </div>
            </div>
            <div className='col-span-3'>
                <div className='rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
                    <div>
                        <p>Experience</p>
                        <h1 className='font-semibold text-lg'>{experience}</h1>
                    </div>
                    <div>
                        <p>Work Level</p>
                        <h1 className='font-semibold text-lg'>{workLevel}</h1>
                    </div>
                    <div>
                        <p>Employment Type</p>
                        <h1 className='font-semibold text-lg'>{employmentType}</h1>
                    </div>
                    <div>
                        <p>Salary Range</p>
                        <h1 className='font-semibold text-lg'>{salaryRange}</h1>
                    </div>
                    <div>
                        <p>Location</p>
                        <h1 className='font-semibold text-lg'>{location}</h1>
                    </div>
                </div>
                <div className='mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5'>
                    <div>
                        <h1 className='font-semibold text-lg'>{companyName}</h1>
                    </div>
                    <div>
                        <p>Company Size</p>
                        <h1 className='font-semibold text-lg'>Above 100</h1>
                    </div>
                    <div>
                        <p>Founded</p>
                        <h1 className='font-semibold text-lg'>2001</h1>
                    </div>
                    <div>
                        <p>Email</p>
                        <h1 className='font-semibold text-lg'>
                            {email ? email : "company@mail.com"}
                        </h1>
                    </div>
                    <div>
                        <p>Company Location</p>
                        <h1 className='font-semibold text-lg'>Los Angeles</h1>
                    </div>
                    <div>
                        <p>Website</p>
                        <a className='font-semibold text-lg' href='#'>
                            https://website.com
                        </a>
                    </div>
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
}

export default page;