import { FC, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import SignIn from '@/app/sign-in/page';



interface WithAuthProps {

}

const WithAuth: FC<WithAuthProps> = (props: React.PropsWithChildren) => {
    const reduxStore = useSelector((state: RootState) => state);
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    if (reduxStore?.auth?.isLoading) {
        return <Loading />
    }
    else if (!reduxStore?.auth?.isLoading && !reduxStore?.auth?.email) {
        return <SignIn />
        // return router.push("/sign-in")
    }
    else {
        return props.children
    };
};

export default WithAuth