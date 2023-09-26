import Link from 'next/link';
import { FC } from 'react';

interface AvatarMenuProps {
    handleCloseProfileAndMenu: () => void;
    profileRef: React.RefObject<HTMLDivElement | null>;
    isProfileOpen: boolean;
    firstName: string | null;
    lastName: string | null;
    email: string;
    handleSignOut: () => void;
}

const AvatarMenu: FC<AvatarMenuProps> = ({
    handleCloseProfileAndMenu,
    profileRef,
    isProfileOpen,
    firstName,
    lastName,
    email,
    handleSignOut,
}: AvatarMenuProps) => {
    return (
        <div>
            {/* avater show all time  */}
            <div
                onMouseUpCapture={handleCloseProfileAndMenu}
                ref={profileRef as React.RefObject<HTMLDivElement>}
                className={`py-4 px-8 rounded-lg shadow-md bg-white dark:bg-gray-800 absolute
                        top-[3.5rem] md:top-[5.25rem] right-[0.0625rem] z-30 ${isProfileOpen ? "scale-100" : "scale-0"} duration-1000 transition-all border`}
            >
                <div className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-auto">
                    <div>
                        <p >{firstName ? `${firstName} ${lastName}` : "No Name found, Update your name pls"}</p>
                        <p >{email}</p>
                    </div>
                </ div>
                <Link href="/dashboard" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                    Dashboard
                </ Link>
                <Link href="" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-not-allowed">
                    Others Comming
                </ Link>
                <Link href="" className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 cursor-not-allowed">
                    Settings
                </ Link>
                <Link href="" onClick={handleSignOut} className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm focus:ring-2 focus:ring-blue-500 text-white bg-red-700 ">
                    Sign out
                </ Link>
            </div>
        </div>
    );
};

export default AvatarMenu;