"use client";

import { useState } from "react";
import { HiChatAlt } from "react-icons/hi";
import HideOnBody from "./container/HideOnBody";
import { BiSolidSend } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import useAppAPIServer from "../../Hooks/useAppAPI";
import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestion } from "react-icons/fa6";

export default function ChatBot({ }) {
    const [chatOpen, setChatOpen] = useState(false);
    const [runTimeInstance, setRunTimeInstance] = useState({
        runtime_id: "7e23f8b1-d1b6-4c2e-a0f2-57b64c70fa3b"
    });
    const [userInput, setUserInput] = useState("");
    const [waitingResponse, setWaitingResponse] = useState(false);
    const server = useAppAPIServer();
    const [messages, setMessages] = useState([]);

    async function handelResponse() {
        if (waitingResponse) return;
        setWaitingResponse(true);
        let __messages = messages;
        __messages = [
            ...__messages, {
                content: userInput,
                role: "human"
            }
        ];
        setMessages(__messages);
        setUserInput("");

        let response = await server.POST(`/v1/chat/${runTimeInstance?.runtime_id || "chat-000"}/generate`, {
            messages: __messages,
        });

        setMessages([
            ...__messages,
            response
        ]);
        setWaitingResponse(false);
    }

    return <>
        <div className="fixed right-4 bottom-4 gap-3 flex z-50">
            <AnimatePresence>
                {chatOpen && (
                    <HideOnBody close={() => setChatOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="box w-[400px] h-[500px] shadow rounded-md fcb flex-col bg-white"
                        >
                            <div className="__action px-1 py-3 pl-3 w-full fcb gap-1 border-b border-b-[#00000023]">
                                <div className="fcb gap-3">
                                    <MdOutlineKeyboardBackspace size={25} />
                                    <p>Outliers Chat Service</p>
                                </div>
                                <BsThreeDotsVertical size={25} />
                            </div>

                            <div className="flex-grow flex w-full flex-col px-2 overflow-y-scroll scrollbar-thin">
                                <AnimatePresence initial={false}>
                                    {messages.map((item, index) => {
                                        let humanMessage = item?.role === "human";
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className={`p-2 ${humanMessage ? "bg-pri" : "bg-[#0000008f]"} max-w-[75%] space-y-2 rounded-lg col-rev m-1 self-${humanMessage ? "end" : "start"}`}
                                                dangerouslySetInnerHTML={{ __html: marked.parse(item?.content) }}
                                            />
                                        );
                                    })}
                                    {!messages?.length && <div className="h-full w-full fcc flex-col">
                                        <FaQuestion size={50} className="mb-3" />
                                        <h3 className="sec-head">Hi, How <span className="col-pri">can I help you </span>with?</h3>
                                        <p className="sec-para">Try, What is projectile motion?</p>
                                        <p className="sec-para">What is vector store?</p>
                                    </div>}
                                </AnimatePresence>

                                {waitingResponse && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center space-x-2 px-4 py-2"
                                    >
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></div>
                                    </motion.div>
                                )}
                            </div>

                            <div className="__input px-1 py-2 w-full fcb gap-1 border-t border-t-[#00000023]">
                                <BsThreeDotsVertical size={25} />
                                <input
                                    type="text"
                                    className="border rounded-lg p-2 w-full outline-none transition duration-200"
                                    value={userInput}
                                    onChange={e => setUserInput(e.target.value)}
                                />
                                <button className="button-pri p-2 ml-2 transition hover:scale-105" onClick={handelResponse}>
                                    <BiSolidSend />
                                </button>
                            </div>
                        </motion.div>
                    </HideOnBody>
                )}
            </AnimatePresence>

            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-full p-3 cursor-pointer self-end bg-alt shadow-md transition"
                onClick={() => setChatOpen(!chatOpen)}
            >
                {chatOpen ? <IoMdClose size={35} className="col-pri" /> : <HiChatAlt size={35} className="col-pri" />}
            </motion.button>
        </div>
    </>
};