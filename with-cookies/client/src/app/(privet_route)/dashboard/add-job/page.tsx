import AddJob from '@/components/AddJob';
import { FC } from 'react';

interface PageProps {

};

const Page: FC<PageProps> = ({ }) => {
    return (
        <div>
            <AddJob />
        </div>
    );
};

export default Page;