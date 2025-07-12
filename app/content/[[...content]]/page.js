"use client";

import Container from "@/app/bundles/components/common/container";
import Slider from "@/app/bundles/components/common/Slider";
import useAppAPIServer from "@/app/bundles/Hooks/useAppAPI";
import NotFound from "@/app/not-found";
import { marked } from "marked";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const server = useAppAPIServer();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [content, setContent] = useState(null);
    const [catalogs, setCatalogs] = useState(null);
    const pathName = usePathname();

    useEffect(() => {
        async function fetchData() {
            try {
                const path = (params?.content || []).join("/");
                const response = await server.GET(`/v1/content/${path}`);

                if (response?.status === "failed" || (!response.content && !response.catalogs)) {
                    setError(true);
                } else {
                    if (response.content) setContent(response.content);
                    if (response.catalogs) setCatalogs(response.catalogs);
                }
            } catch (err) {
                console.error("Error fetching content:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [params]);

    function renderCatalogTree(node, path = []) {
        if (Array.isArray(node)) {
            return (
                <ul className="space-y-1">
                    {node.map((slug) => {
                        const fullPath = [...path, slug].join("/");
                        return (
                            <li key={fullPath}>
                                <Link href={`/${pathName}/${fullPath}`} className="text-blue-600 hover:underline capitalize">
                                    {slug.replaceAll("-", " ")}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <ul className="space-y-4">
                {Object.entries(node).map(([key, value]) => (
                    <li key={key}>
                        <div className="font-semibold text-gray-900 mb-1 capitalize">{key.replaceAll("-", " ")}</div>
                        <div className="ml-4">
                            {renderCatalogTree(value, [...path, key])}
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Container.W1400 className="my-6 flex gap-4">
                <Slider />

                <div className="flex-1">
                    <style>{`
                    .content {
                        color: #374151;
                        line-height: 1.75;
                        font-size: 1.05rem;
                        word-wrap: break-word;
                    }
                    .content h1, .content h2, .content h3 {
                        font-weight: 700;
                        color: #111827;
                    }
                    .content h1 {
                        font-size: 2.25rem;
                        margin-bottom: 1rem;
                        margin-top: 1.5rem;
                    }
                    .content h2 {
                        font-size: 1.75rem;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                    }
                    .content h3 {
                        font-size: 1.4rem;
                        margin-top: 1.5rem;
                        margin-bottom: 0.75rem;
                    }
                    .content p {
                        margin-bottom: 1.25rem;
                    }
                    .content ul, .content ol {
                        padding-left: 1.5rem;
                        margin-bottom: 1.25rem;
                    }
                    .content li {
                        margin-bottom: 0.5rem;
                    }
                    .content code {
                        background-color: #f3f4f6;
                        padding: 0.2rem 0.4rem;
                        border-radius: 0.3rem;
                        font-size: 0.95em;
                    }
                    .content pre {
                        background-color: #f3f4f6;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        overflow-x: auto;
                        margin: 2rem 0;
                    }
                    .content pre code {
                        background-color: transparent;
                        padding: 0;
                    }
                    .content blockquote {
                        border-left: 4px solid #d1d5db;
                        padding-left: 1rem;
                        color: #6b7280;
                        margin: 1.5rem 0;
                    }
                    .content a {
                        color: #3b82f6;
                        text-decoration: underline;
                    }
                    .content a:hover {
                        color: #1d4ed8;
                    }
                    .content hr {
                        height: 1px;
                        background-color: #e5e7eb;
                        margin: 2rem 0;
                        border: none;
                    }
                    `}</style>

                    {loading ? (
                        <div className="flex justify-center items-center h-full mt-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-600 mt-10 font-medium text-center">
                            Oops! Something went wrong or content not found.
                        </div>
                    ) : content ? (
                        <div className="content px-1 sm:px-2 md:px-4" dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
                    ) : catalogs ? (
                        <div className="mt-8 pt-8 border-t">
                            <h2 className="text-2xl font-semibold mb-4">Topics</h2>
                            {renderCatalogTree(catalogs)}
                        </div>
                    ) : (
                        <div className="text-gray-500 mt-10 text-center">Nothing found!</div>
                    )}
                </div>
            </Container.W1400>
        </div>
    );
}