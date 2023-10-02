import { FC } from 'react'
import PostedJobs from '@/components/PostedJobs'

interface pageProps {

};

const page: FC<pageProps> = ({ }) => {
    return (
        <div>
            <PostedJobs />
        </div>
    )
};

export default page;