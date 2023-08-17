import Jobs from '@/components/Jobs'
import { FC } from 'react'


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