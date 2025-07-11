"use client";

export default function NavBar({ }) {
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
                            <h4 class="text-lg md:text-xl text-nowrap overflow-hidden text-ellipsis font-semibold">Outliers</h4>
                        </a>
                    </div>
                    <div class="hidden flex-grow h-full md:flex justify-end items-center space-x-6">
                        <div class="group relative h-full flex">
                            <h3 class="capitalize select-none cursor-pointer flex gap-1 items-center transition-all duration-300">
                                <span class="capitalize para">Physics</span>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="group-hover:rotate-180 transition-transform" height="15" width="15" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">
                                    </path>
                                </svg>
                            </h3>
                            <div class="l">
                                <div class="hidden group-hover:flex flex-col absolute top-3/4 -left-4 bg-[var(--background-sec)] shadow-lg rounded-md w-[250px] border border-[#8686864d] z-10">
                                    <a class="flex p-2 border-b items-center justify-between" href="/category/img">
                                        <h3 class="para col-pri capitalize ml-1">
                                            <span class="col-sec font-semibold">Physics</span></h3>
                                        <span class="button-sec block px-1 py-[2px]">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 3V5H3V3H12ZM16 19V21H3V19H16ZM22 11V13H3V11H22Z">
                                                </path>
                                            </svg>
                                        </span>
                                    </a>
                                    <div class="flex flex-col">
                                        <a class="fc gap-2 p-2 border-b border-b-[#8686864d] hover:bg-[var(--hover-pri)] para" href="/board/physic/lens">
                                            Lens
                                        </a>
                                        <a class="fc gap-2 p-2 border-b border-b-[#8686864d] hover:bg-[var(--hover-pri)] para" href="/board/physic/projectile">
                                            Projectile
                                        </a>
                                        <a class="fc gap-2 p-2 border-b border-b-[#8686864d] hover:bg-[var(--hover-pri)] para" href="/board/physic/swimming">
                                            Swimming
                                        </a>
                                        <a class="fc gap-2 p-2 border-b border-b-[#8686864d] hover:bg-[var(--hover-pri)] para" href="/board/physic/vector">
                                            Vector
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative group">
                            <div class="rounded-full cursor-pointer">
                                <img loading="lazy" src="/icon.ico" class="border rounded-full min-w-[32px] min-h-[32px] w-[32px] h-[32px]" />
                            </div>
                            <div class="hidden group-hover:block bg-[var(--background)] z-10 absolute top-[105%] shadow-lg rounded-md -right-0 w-[330px] border gap-1">
                                <div class="rounded-lg bg shadow overflow-hidden">
                                    <div class="p-4 flex items-center justify-between border-b">
                                        <div>
                                            <h3>Join <span class="col-pri">Our Family</span>.</h3>
                                            <span class="sec-para">Get access to all premium tools.</span>
                                        </div>
                                    </div>
                                    <div>
                                        <a class="w-full px-4 py-3 fc gap-3 hover:bg-[var(--hover-pri)]" href="/pricing">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="col-pri" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="none" stroke-width="2" d="M12,18 L12,8 L12,18 Z M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M17,12 L12,7 L7,12">
                                                </path>
                                            </svg>
                                            <span class="para">Upgrade Plan</span>
                                        </a>
                                        <a class="w-full px-4 py-3 fc gap-3 hover:bg-[var(--hover-pri)]" href="/category">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 3a3 3 0 0 0-3 3v1.5a.75.75 0 0 0 1.5 0V6A1.5 1.5 0 0 1 6 4.5h1.5a.75.75 0 0 0 0-1.5H6ZM16.5 3a.75.75 0 0 0 0 1.5H18A1.5 1.5 0 0 1 19.5 6v1.5a.75.75 0 0 0 1.5 0V6a3 3 0 0 0-3-3h-1.5ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM4.5 16.5a.75.75 0 0 0-1.5 0V18a3 3 0 0 0 3 3h1.5a.75.75 0 0 0 0-1.5H6A1.5 1.5 0 0 1 4.5 18v-1.5ZM21 16.5a.75.75 0 0 0-1.5 0V18a1.5 1.5 0 0 1-1.5 1.5h-1.5a.75.75 0 0 0 0 1.5H18a3 3 0 0 0 3-3v-1.5Z">
                                                </path>
                                            </svg>
                                            <span class="para">Explore Products</span>
                                        </a>
                                    </div>
                                    <div class="w-full p-3 border-t">
                                        <div class="fcb w-full gap-2">
                                            <a class="w-full button-pri flex-grow" href="https://app.toolstol.com/__/auth/join?rd=login_button&amp;sr=nav_compo&amp;redirect=https%3A%2F%2Fwww.toolstol.com%2F">Login</a>
                                            <a class="w-full button-sec flex-grow" href="https://app.toolstol.com/__/auth/join?rd=signup_button&amp;sr=nav_compo&amp;redirect=https%3A%2F%2Fwww.toolstol.com%2F">SignUp</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="md:hidden fc justify-center rounded focus:outline-none">
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