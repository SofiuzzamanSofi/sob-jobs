import { FC } from 'react';

interface CompanyInfoSecondParaProps {
    companyName: string;
    email: string;
};

const CompanyInfoSecondPara: FC<CompanyInfoSecondParaProps> = ({
    companyName,
    email,
}) => {
    return (
        <>
            {/* second para  */}
            <div>
                <h1 className='font-semibold lg:text-lg'>{companyName}</h1>
            </div>
            <div>
                <p>Company Size</p>
                <h1 className='font-semibold lg:text-lg'>Above 100</h1>
            </div>
            <div>
                <p>Founded</p>
                <h1 className='font-semibold lg:text-lg'>2001</h1>
            </div>
            <div>
                <p>Email</p>
                <h1 className='font-semibold lg:text-lg'>
                    {email ? email : "company@mail.com"}
                </h1>
            </div>
            <div>
                <p>Company Location</p>
                <h1 className='font-semibold lg:text-lg'>Los Angeles</h1>
            </div>
            <div>
                <p>Website</p>
                <a className='font-semibold lg:text-lg' href='#'>
                    https://website.com
                </a>
            </div>
        </>
    );
};

export default CompanyInfoSecondPara;