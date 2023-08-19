import { FC } from 'react'

interface PageProps {

}

const Page: FC<PageProps> = ({ }) => {
    return (
        <div>
            <h1>
                message home page
            </h1>
            <h1>
                No Chat History Here.
            </h1>
        </div>
    )
}

export default Page;