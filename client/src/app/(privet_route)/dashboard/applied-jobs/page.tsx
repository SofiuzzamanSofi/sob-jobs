import AppliedJobs from '@/components/AppliedJobs'
import { FC } from 'react';

interface PageProps {

};

const Page: FC<PageProps> = ({ }) => {
    return (
        <div>
            <AppliedJobs />
        </div>
    );
};

export default Page;