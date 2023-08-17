import AddJob from '@/components/AddJob';
import { FC } from 'react'


interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return <div>
        <AddJob />
    </div>
}

export default page;