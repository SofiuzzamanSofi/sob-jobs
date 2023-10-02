import EmployerRegistration from '@/components/register/EmployerRegistration';
import { FC } from 'react'

interface EmployerProps {

};

const Employer: FC<EmployerProps> = ({ }) => {
    return (
        <div>
            <EmployerRegistration />
        </div>
    );
};

export default Employer;