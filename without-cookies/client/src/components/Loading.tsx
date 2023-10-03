import { FC } from 'react'
import loading from "../assets/loading.gif";
import Image from 'next/image';

interface LoadingProps {

};

const Loading: FC<LoadingProps> = ({ }) => {

    const style = {
        background: `radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%)`,
    };

    return (
        <div className='relative flex justify-center items-center h-screen w-full'>
            <div style={style} className=' h-full w-full absolute top-0'></div>
            <Image src={loading} alt='Loading-Image' />
        </div>
    );
};

export default Loading;