import PostedJobs from '@/workArea/components/PostedJobs'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (
        <div>
            <PostedJobs />
        </div>
    )
}

export default page