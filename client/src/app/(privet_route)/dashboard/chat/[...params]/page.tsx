"use client";

import { FC } from 'react'

interface PageProps {
    params: {
        params: string[];
    }
}

const Page: FC<PageProps> = ({ params }) => {

    const [id1, id2] = params?.params[0]?.split("-")
    console.log("id1, id2:", id1, id2);
    return (
        <div>
            chati-id1-id2 & chatId 3
        </div>
    )
}

export default Page;