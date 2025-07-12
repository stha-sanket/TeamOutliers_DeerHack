"use client";

import Loader from "@/bundles/components/UseFul/Loader";
import Button from "@/bundles/components/UseFul/LoadingButton";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useApplication } from "../bundles/context/Application";

export default function Login() {
    const { auth } = useApplication();
    const router = useRouter(); 
    const searchParams = useSearchParams();

    useEffect(() => {
        if (auth.user_exist) {
            const redirect = searchParams.get("redirect");
            if (redirect) {
                router.replace(redirect);
                return;
            }

            router.push(`/`);
        }
    }, [auth.user_exist]);

    return <>
        <div className="relative h-[90vh] w-full flex items-center justify-center px-4">
            {auth.user_exist === undefined && <Loader className={"z-30 backdrop-blur-sm"} loading={"Loading..."} height={"20px"} />}

            <div className="l">
                <img src="" alt="" />
            </div>

            <div className="w-full max-w-[400px] shadow-xl rounded-2xl p-6 bg-alt">
                <h2 className="text-2xl font-bold mb-2">Join <span className="col-pri">ToolsTol</span> Family.</h2>
                <p className="text-sm mb-6">Sign in to access premium tools, and more.</p>

                <div className="space-y-4">
                    <Button className="button-sec border-sec col-sec p-2 w-full fcc gap-2 bg-alt" reloadEvent={false} callable={() => signIn("google")}>
                        <FcGoogle size={20} />
                        <span className="para">Continue with Google</span>
                    </Button>

                    <div className="text-center w-[80%] mx-auto text-gray-400 sec-para h-[9px] border-b">
                        <span className="px-2 bg-alt">
                            or
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 relative">
                        <input className="rounded-md w-full border p-3 outline-none" type="email" placeholder="Email" />
                        <input className="rounded-md w-full border p-3 outline-none" type="password" placeholder="Password" />
                        <button className="button-pri w-full">Join</button>

                        <div className="absolute top-0 right-0 w-full h-full cursor-not-allowed" />
                    </div>
                </div>

                <AppTermsAndCondition />
            </div>
        </div>
    </>
}