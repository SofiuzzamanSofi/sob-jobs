

import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    const router = useRouter();
    const pathname = usePathname() ?? '';
    // const { id } = router.query;

    // console.log("id:", id);

    console.log("router:", router);
    console.log("pathname:", pathname);

    return <div>page</div>
}

export default page