"use client";

import { useState } from "react";
import { HiChatAlt } from "react-icons/hi";
import HideOnBody from "./container/HideOnBody";
import { BiSolidSend } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import useAppAPIServer from "../../Hooks/useAppAPI";

export default function ChatBot({ }) {
    const [chatOpen, setChatOpen] = useState(false)
    const [runTimeInstance, setRunTimeInstance] = useState({
        runtime_id: ""
    })
    const [userInput, setUserInput] = useState("")
    const [waitingResponse, setWaitingResponse] = useState(false)
    const server = useAppAPIServer()
    const [messages, setMessages] = useState(
        [
            { content: "Hi, how may I help you?", role: "ai" },
        ]
    )


    async function handelResponse() {
        if (waitingResponse) return
        setWaitingResponse(true)
        setMessages(messages => [...messages, {
            content: userInput,
            role: "human"
        }])
        setUserInput("")

        let response = await server.POST(`/v1/chat/${runTimeInstance?.runtime_id || "chat-000"}/generate`, {
            messages: messages,
        })

        console.log(response);
    }

    return <>
        <div className="fixed right-4 bottom-4 gap-3 flex">
            {(chatOpen) && <HideOnBody close={() => setChatOpen(false)}>
                <div className="box w-[350px] h-[500px] shadow rounded-md fcb flex-col">
                    <div className="__action px-1 py-3 w-full fcb gap-1 border-b border-b-[#00000023]">
                        <div className="fcb gap-3">
                            <MdOutlineKeyboardBackspace size={25} />
                            <p>Outliers Chat Service</p>
                        </div>
                        <BsThreeDotsVertical size={25} />
                    </div>
                    <div className="flex-grow flex w-full flex-col px-2 overflow-y-scroll">
                        {messages.map(item => {
                            let humanMessage = item?.role === "human"
                            return <div className={`p-2 ${humanMessage ? "bg-pri" : "bg-[#0000008f]"} rounded-lg col-rev m-1 self-${humanMessage ? "end" : "start"}`}>
                                <p>{item?.content}</p>
                            </div>
                        })}
                        {waitingResponse && <>
                            <div className="flex items-center space-x-2 px-4 py-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></div>
                            </div>
                        </>}
                    </div>
                    <div className="__input px-1 py-2 w-full fcb gap-1 border-t border-t-[#00000023]">
                        <BsThreeDotsVertical size={25} />
                        <input type="text" className="border rounded-lg p-1 w-full outline-none" value={userInput} onChange={e => setUserInput(e.target.value)} />
                        <button className="button-pri p-2 ml-2" onClick={handelResponse}>
                            <BiSolidSend />
                        </button>
                    </div>
                </div>
            </HideOnBody>}


            <button className="rounded-full p-2 cursor-pointer self-end bg-alt shadow-md" onClick={() => setChatOpen(!chatOpen)}>
                <HiChatAlt size={25} className="col-pri" />
            </button>
        </div>
    </>
};