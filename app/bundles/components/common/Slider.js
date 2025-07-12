"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAppAPIServer from "../../Hooks/useAppAPI";
import Link from "next/link";

export default function Slider({ }) {
    const pathname = usePathname()
    const server = useAppAPIServer()
    const [__states, __setStates] = useState({})

    async function handelLoadData(path) {
        let response = await server.GET(`/v1/context/${path}`)
        __setStates(response)
    }

    useEffect(() => {
        let path = pathname?.split("/")?.filter(x => !!x)
        if (path?.[0] === "content" || path?.[0] === "quiz") {
            path = path?.slice(1, 3)?.join("/")
        }
        handelLoadData(path)
    }, [pathname])

    function renderCatalogTree(node, path = [], numbering = []) {
        if (Array.isArray(node)) {
            return (
                <ul className="space-y-1">
                    {node.map((slug, idx) => {
                        const fullPath = [...path, slug].join("/");
                        const num = [...numbering, idx + 1].join(".");
                        return (
                            <li key={fullPath}>
                                <Link href={`${pathname}/${fullPath}`} className="capitalize">
                                    <span className="mr-1">{num}</span>  {slug.replaceAll("-", " ")}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <ul className="space-y-2">
                {Object.entries(node).map(([key, value], idx) => {
                    const num = [...numbering, idx + 1];
                    const label = num.join(".");
                    const fullPath = [...path, key].join("/");
                    return (
                        <li key={fullPath}>
                            <Link href={`${pathname}/${fullPath}`} className="font-medium capitalize mt-2">
                                {label}. {key.replaceAll("-", " ")}
                            </Link>
                            <div className="ml-5 my-1">
                                {renderCatalogTree(value, [...path, key], num)}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }


    return <div className="w-full max-w-[400px] border border-[#00000017] rounded-lg mr-5 p-5 h-fit">
        <h4 className="font-medium mb-2 ter-head">All Topics</h4>
        {renderCatalogTree(__states)}
    </div>
};