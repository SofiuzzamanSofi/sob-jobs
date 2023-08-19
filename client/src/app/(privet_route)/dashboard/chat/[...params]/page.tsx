"use client";

import { useGetMessageByIdQuery, usePostMessageByIdMutation } from '@/redux/features/message/messageApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react'
import React, { useState } from 'react';
import { useRef, useEffect } from 'react';

interface PageProps {
    params: {
        params: string[];
    }
}

const Page: FC<PageProps> = ({ params, }) => {

    const router = useRouter();
    const searchParams = useSearchParams()
    const [text, setText] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [id1, id2] = params?.params[0]?.split("-")
    // console.log("id1, id2:", id1, id2);

    const { isLoading: messageIsLoading, isError: messageIsError, data: messageData } = useGetMessageByIdQuery(`${id1}-${id2}`);
    const [postMessage, { isLoading: postMessageIsLoading, isError: postMessageIsError, isSuccess: postMessageIsSuccess }] = usePostMessageByIdMutation();

    const submitMessage = () => {
        const trimmedText = text?.trim(); // Remove leading and trailing whitespaces
        if (!trimmedText) {
            return; // Return early if the text is empty or whitespace-only
        } else {
            const messageData = {
                messageId: `${id1}-${id2}`,
                // messageEmail: `${email1}-${email2}`,
                messageEmail: searchParams?.get("messageEmail"),
                message: trimmedText,

            }
            console.log("submitPress-TEXT:", messageData); // whatsApp is similler like this
            // console.log("submitPress-TEXT:", text);
            setText("");
            // next code for the function
            // window.alert(trimmedText);
            // textAreaRef.current?.focus()
        }
    }

    const functionCallOnPressInter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitMessage();
        }
    };


    // console.log("params line 48:", params);
    // console.log("router line 49:", router);
    // console.log("searchParams line 50:", searchParams?.get("messageEmail"));


    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    return (
        <div>
            <div>
                <h1>chati-id1-id2 & chatId 3 || HEADER</h1>
            </div>
            <div>
                <h1>MIDDLE</h1>
            </div>
            <div>
                <textarea
                    className='border p-2'
                    placeholder='Write a message'
                    ref={textAreaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => functionCallOnPressInter(e)}
                />

            </div>
        </div>
    )
}

export default Page;