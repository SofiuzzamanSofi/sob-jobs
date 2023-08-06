import AppliedJobs from '@/workArea/components/candidateDashboard/AppliedJobs'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (
        <div>
            <AppliedJobs />
        </div>
    )
}

export default page