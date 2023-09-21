"use client";

import { usePathname } from 'next/navigation';
import { FC } from 'react'

interface FooterProps {

};

const Footer: FC<FooterProps> = ({ }) => {

    const pathname = usePathname() ?? "";
    const pathNameTotalArray = pathname.split("/")
    const pathNameArray = pathNameTotalArray.filter((path) => path !== "")

    if (pathNameArray.includes("sign-up") || pathNameArray.includes("sign-in")) {
        return null;
    }
    else {
        return (
            <div
                style={{
                    // position: 'fixed',
                    // marginTop: "30px",
                    // bottom: '0px',
                    // left: '0px',
                    // right: '0px',
                    // zIndex: '10',
                    height: "3rem",
                    borderTopWidth: "1px",
                    padding: "16px",
                }}
            >
                <h6
                    style={{
                        textAlign: 'center',
                    }}
                >
                    All Right Reserver @ 2023
                </h6>
            </div>
        );
        // };
    };
};

export default Footer;