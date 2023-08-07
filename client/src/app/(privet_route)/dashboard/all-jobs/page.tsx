import { FC } from 'react'
import Jobs from '@/workArea/components/Jobs';

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (
        <div>
            <Jobs />
        </div>
    )
}

export default page