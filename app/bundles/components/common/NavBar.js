"use client";

import Link from "next/link";
import { useApplication } from "../../context/Application";

export default function NavBar({ }) {
    const { auth } = useApplication()

    return <>
        <nav class="bg-[var(--background-sec)] shadow border-b border-b-[#8686864d]" data-type="nav-section">
            <div class="w-[90%] max-w-[1500px] mx-auto px-4">
                <div class="fc justify-between h-16 md:h-20 xl:h-24">
                    <div class="fc gap-3 overflow-hidden">
                        <div class="relative fc h-[50px] min-w-[40px]">
                            <a href="/">
                                <img loading="lazy" src="/icon.ico" class="w-[40px] md:w-[50px]" />
                            </a>
                        </div>
                        <a class="hidden md:block overflow-hidden mr-2" href="/">
                            <h4 class="text-lg md:text-xl text-nowrap overflow-hidden text-ellipsis font-semibold">ConceptC</h4>
                        </a>
                    </div>
                    <div class="hidden flex-grow h-full md:flex justify-end items-center space-x-6">
                        <div class="group relative h-full flex">
                            <h3 class="capitalize select-none cursor-pointer flex gap-1 items-center transition-all duration-300">
                                <Link href="/quiz">
                                    <span class="capitalize para">Quiz's</span>
                                </Link>
                            </h3>
                        </div>
                        <div class="group relative h-full flex">
                            <h3 class="capitalize select-none cursor-pointer flex gap-1 items-center transition-all duration-300">
                                <Link href="/service/simulation">
                                    <span class="capitalize para">Simulation</span>
                                </Link>
                            </h3>
                        </div>
                        <div class="group relative h-full flex">
                            <h3 class="capitalize select-none cursor-pointer flex gap-1 items-center transition-all duration-300">
                                <Link href="/service/models">
                                    <span class="capitalize para">Models</span>
                                </Link>
                            </h3>
                        </div>
                        <div class="group relative h-full flex">
                            <h3 class="capitalize select-none cursor-pointer flex gap-1 items-center transition-all duration-300">
                                <Link href="/content/grade-11/biology">
                                    <span class="capitalize para">Biology</span>
                                </Link>
                            </h3>
                        </div>
                        <div class="group relative h-full flex">
                            <h3 class="capitalize select-none cursor-pointer flex gap-1 items-center transition-all duration-300">
                                <Link href="/content/grade-11/physics">
                                    <span class="capitalize para">Physics</span>
                                </Link>
                            </h3>
                        </div>
                        <div class="relative group">
                            <div class="cursor-pointer">
                                {auth?.user_exist ? <div className="fcc gap-5">
                                    <img loading="lazy" src={auth?.image || "/icon.ico"} class="border rounded-full min-w-[32px] min-h-[32px] w-[32px] h-[32px]" />
                                    <button className="button-pri px-3 py-2">Logout</button>
                                </div> : <Link href="/login" className="button-pri">Login</Link>}
                            </div>
                        </div>
                    </div>
                    <button class="md:hidden fc justify-center rounded">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" class="transition-all duration-300 rotate-180" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    </>
};