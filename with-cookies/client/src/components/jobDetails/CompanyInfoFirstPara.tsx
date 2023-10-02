import { FC } from 'react';

interface CompanyInfoFirstParaProps {
    experience: string;
    workLevel: string;
    employmentType: string;
    salaryRange: string;
    location: string;
};

const CompanyInfoFirstPara: FC<CompanyInfoFirstParaProps> = ({
    experience,
    workLevel,
    employmentType,
    salaryRange,
    location,
}) => {
    return (
        <>
            {/* first para  */}
            <div>
                <p>Experience</p>
                <h1 className='font-semibold lg:text-lg'>{experience}</h1>
            </div>
            <div>
                <p>Work Level</p>
                <h1 className='font-semibold lg:text-lg'>{workLevel}</h1>
            </div>
            <div>
                <p>Employment Type</p>
                <h1 className='font-semibold lg:text-lg'>{employmentType}</h1>
            </div>
            <div>
                <p>Salary Range</p>
                <h1 className='font-semibold lg:text-lg'>{salaryRange}</h1>
            </div>
            <div>
                <p>Location</p>
                <h1 className='font-semibold lg:text-lg'>{location}</h1>
            </div>
        </>
    );
};

export default CompanyInfoFirstPara;