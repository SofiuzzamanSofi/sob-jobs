"use client";

import { gsap } from "gsap";
import Badge from "./Badge";
import Link from "next/link";
import Image from "next/image";
import hero1 from "../assets/hero-01.jpg";
import hero2 from "../assets/hero-02.jpg";
import hero3 from "../assets/hero-03.jpg";
import hero4 from "../assets/hero-04.jpg";
import hero5 from "../assets/hero-05.jpg";
import { useRouter } from 'next/navigation';
import { BiSearchAlt } from "react-icons/bi";
import React, { useLayoutEffect, useRef, useState } from "react";

interface HomeLandingProps { }

const HomeLanding: React.FC<HomeLandingProps> = () => {

    const router = useRouter();
    // const [inputText, setInputText] = useState<string>("");
    const keywords = [
        "Web Developer",
        "Web Designer",
        "Writer",
        "Fullstack",
        "Senior",
        "Team Lead",
        "Administration",
        "SQA",
        "Tester",
    ];

    const el = useRef(null);
    const tl = useRef<gsap.core.Timeline>();
    const tl2 = useRef<gsap.core.Timeline>();

    // ... previous imports and code

    useLayoutEffect(() => {
        let cards = gsap.utils.toArray(".statCard");

        let ctx = gsap
            .context(() => {
                tl.current = gsap
                    .timeline({ repeat: -1 })
                    .to("#hero1", { opacity: 1, duration: 2 })
                    .to("#hero1", { opacity: 0, display: "none", duration: 2, delay: 1 })
                    .to("#hero2", { opacity: 1, duration: 2 })
                    .to("#hero2", { opacity: 0, display: "none", duration: 2, delay: 1 })
                    .to("#hero3", { opacity: 1, duration: 2 })
                    .to("#hero3", { opacity: 0, display: "none", duration: 2, delay: 1 })
                    .to("#hero4", { opacity: 1, duration: 2 })
                    .to("#hero4", { opacity: 0, display: "none", duration: 2, delay: 1 })
                    .to("#hero5", { opacity: 1, duration: 2 })
                    .to("#hero5", { opacity: 0, display: "none", duration: 2, delay: 1 });

                tl2.current = gsap
                    .timeline()
                    .from("#hero-title", { delay: 0.2, y: 50, opacity: 0, duration: 0.3 })
                    .from("#hero-subtitle", { y: 50, opacity: 0, duration: 0.3 })
                    .from("#search-container", { y: 50, opacity: 0, duration: 0.3 })
                    .from("#search-button", {
                        x: -100,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2",
                    })
                    .from(".badge-container", { opacity: 0 })
                    .from(".badge", { opacity: 0, y: 50, stagger: 0.1 });
            });

        const movement = (e: MouseEvent) => {
            cards.forEach((card, index) => {
                const depth = 90;
                const moveX = (e.pageX - window.innerWidth / 2) / depth;
                const moveY = (e.pageY - window.innerHeight / 2) / depth;
                index++;
                gsap.to(card as any, {
                    x: moveX * index,
                    y: moveY * index,
                });
            });
        };

        document.addEventListener("mousemove", movement);

        return () => {
            ctx.revert();

            document.removeEventListener("mousemove", movement);
        };
    }, []);

    // ... rest of the JSX code
    // const submitInputMessage = () => {
    //     const trimmedText = inputText?.trim(); // Remove leading and trailing whitespaces
    //     if (!trimmedText) {
    //         return; // Return early if the text is empty or whitespace-only
    //     } else {
    //         // console.log('trimmedText:', trimmedText);
    //     }
    // }

    // const functionCallOnPressInter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter" && !e.shiftKey) {
    //         e.preventDefault();
    //         submitInputMessage();
    //     }
    // };
    // useLayoutEffect(() => {
    //     if (inputText) {
    //         router.push("/dashboard/search-jobs");
    //     }
    // }, [inputText]);

    return (
        <div ref={el} className='relative max-w-[85rem]'>
            <div
                className="h-[calc(100vh-18rem)] overflow-hidden z-0 translate-x-0 transition-all duration-500 transform fixed top-0 bottom-0 right-0 left-0"
            >
                <Image
                    id='hero1'
                    src={hero1}
                    alt=''
                    className='object-cover h-full w-full opacity-0'
                />
                <Image
                    id='hero2'
                    src={hero2}
                    alt=''
                    className='object-cover h-full w-full opacity-0'
                />
                <Image
                    id='hero3'
                    src={hero3}
                    alt=''
                    className='object-cover h-full w-full opacity-0'
                />
                <Image
                    id='hero4'
                    src={hero4}
                    alt=''
                    className='object-cover h-full w-full opacity-0'
                />
                <Image
                    id='hero5'
                    src={hero5}
                    alt=''
                    className='object-cover h-full w-full opacity-0'
                />
            </div>
            <div className='h-full w-full flex flex-col md:flex-row items-center z-10 relative overflow-hidden'>
                <div className='md:w-1/2 flex flex-col items-start'>
                    <h1 id='hero-title' className='heroElement font-bold text-4xl md:text-7xl capitalize  dark:text-white'>
                        Find the perfect <br /> job for you
                    </h1>
                    <p id='hero-subtitle' className='mt-5 text-lg'>
                        Search your career opportunity through 12,800 jobs
                    </p>
                    <div
                        id='search-container'
                        className='bg-white rounded-full p-3 flex w-full max-w-xl overflow-hidden mt-5 shadow-lg '
                    >
                        <input
                            className='flex-auto text-lg p-2 border-none outline-none focus:ring-0'
                            type='text'
                            name='search'
                            id='search'
                            placeholder='Job title or Keyword'
                            // value={inputText}
                            // onChange={(e) => setInputText(e.target.value)}
                            // onKeyDown={(e) => functionCallOnPressInter(e)}
                            onFocus={() => router.push("/dashboard/search-jobs")}
                        />
                        <Link
                            href='/dashboard/search-jobs'
                        >
                            <button
                                id='search-button'
                                className='p-2 rounded-full bg-primary  h-14 w-14 grid place-items-center'
                            // onClick={submitInputMessage}
                            >
                                <BiSearchAlt size='23' color='white' />
                            </button>
                        </Link>
                    </div>
                    <div className='mt-16'>
                        <h2 className='badge-container'>Popular Search</h2>
                        <div className='mt-3 max-w-xl flex flex-wrap  gap-3'>
                            {keywords.map((item, index) => (
                                <Badge key={index} className='badge'>
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between gap-4 py-4'>
                    <div className='statCard rounded-3xl shadow-2xl p-4 md:p-7 text-gray-500 dark:text-gray-300
                     bg-white dark:bg-gray-900 relative right-[0%] md:left-[60%] lg:left-[80%]'>
                        <p>
                            <span className='text-lg md:text-2xl font-bold'>319 </span>
                            <span>Job offers</span>
                        </p>
                        <p className='font-light'>
                            In Business Development
                        </p>
                    </div>
                    <div className='statCard rounded-3xl shadow-2xl p-4 md:p-7 text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-900 relative left-[20%] md:left-[40%] lg:left-[60%]'>
                        <div>
                            <span className='text-lg md:text-2xl font-bold'>265 </span>
                            <span>Job offers</span>
                        </div>
                        <p className='font-light '>
                            In Marketing & Communication
                        </p>
                    </div>
                    <div className='statCard rounded-3xl shadow-2xl p-4 md:p-7 text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-900 relative left-[0%] md:left-[20%] lg:left-[40%]'>
                        <div>
                            <span className='text-lg md:text-2xl font-bold'>324 </span>
                            <span>Job offers</span>
                        </div>
                        <p className='font-light '>In Project Management</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeLanding;