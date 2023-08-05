import EmployerRegistration from '@/workArea/components/register/EmployerRegistration';
import { FC } from 'react'

interface employerProps {

}

const employer: FC<employerProps> = ({ }) => {
    return (
        <div>
            <EmployerRegistration />
        </div>
    );
};

export default employer