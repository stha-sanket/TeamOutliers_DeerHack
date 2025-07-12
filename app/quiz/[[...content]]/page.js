"use client";

import Container from "@/app/bundles/components/common/container";
import Slider from "@/app/bundles/components/common/Slider";
import useAppAPIServer from "@/app/bundles/Hooks/useAppAPI";
import { marked } from "marked";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const server = useAppAPIServer();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [content, setContent] = useState(null);
    const [catalogs, setCatalogs] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const pathName = usePathname();
    const redirect = useRouter();

    useEffect(() => {
        if (pathName === "/quiz"){
            redirect.push()
        }
        
        async function fetchData() {
            try {
                const path = (params?.content || []).join("/");
                const response = await server.GET(`/v1/quiz/${path}`);

                if (
                    response?.status === "failed" ||
                    (!response.content && !response.catalogs && !response.quiz)
                ) {
                    setError(true);
                } else {
                    if (response.content) setContent(response.content);
                    if (response.catalogs) setCatalogs(response.catalogs);
                    if (response.quiz) setQuiz(response.quiz);
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

    const handleAnswerSelect = (questionIndex, optionIndex) => {
        if (showResults) return;

        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: optionIndex,
        }));
    };

    const handleSubmitQuiz = () => {
        if (!quiz?.questions) return;

        let correctCount = 0;
        quiz.questions.forEach((q, i) => {
            if (selectedAnswers[i] === q.correct_answer) correctCount++;
        });

        setScore(correctCount);
        setShowResults(true);
    };

    const resetQuiz = () => {
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
    };

    function renderCatalogTree(node, path = []) {
        if (Array.isArray(node)) {
            return (
                <ul className="space-y-1">
                    {node.map((slug) => {
                        const fullPath = [...path, slug].join("/");
                        return (
                            <li key={fullPath}>
                                <Link
                                    href={`/${pathName}/${fullPath}`}
                                    className="text-blue-600 hover:underline capitalize"
                                >
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
                        <div className="font-medium text-gray-900 mb-2 capitalize">{key.replaceAll("-", " ")}</div>
                        <div className="ml-4">{renderCatalogTree(value, [...path, key])}</div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Container.W1000 className="py-12 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3">
                    <Slider />
                </div>

                <div className="w-full lg:w-2/3">
                    <style>{`
                        .content {
                            color: #374151;
                            line-height: 1.75;
                            font-size: 1.05rem;
                        }
                        .content h1, .content h2, .content h3 {
                            font-weight: 700;
                            color: #111827;
                        }
                        .content h1 { font-size: 2.25rem; margin-bottom: 1rem; margin-top: 1.5rem; }
                        .content h2 { font-size: 1.75rem; margin: 2rem 0 1rem 0; }
                        .content h3 { font-size: 1.4rem; margin: 1.5rem 0 0.75rem 0; }
                        .content p { margin-bottom: 1.25rem; }
                        .content ul, .content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
                        .content li { margin-bottom: 0.5rem; }
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
                        .content a { color: #3b82f6; text-decoration: underline; }
                        .content a:hover { color: #1d4ed8; }
                        .content hr {
                            height: 1px;
                            background-color: #e5e7eb;
                            margin: 2rem 0;
                            border: none;
                        }
                    `}</style>

                    {loading && (
                        <div className="flex justify-center items-center min-h-[200px]">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="text-center text-red-500 font-medium mt-10">
                            Content not found or something went wrong.
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            {content && (
                                <div
                                    className="content px-1 sm:px-2 md:px-4"
                                    dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
                                />
                            )}

                            {quiz?.questions?.length > 0 && (
                                <div className="">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-semibold text-gray-900">Quiz</h2>
                                        {showResults && (
                                            <div className="text-lg font-medium">
                                                Score: {score}/{quiz.questions.length}
                                            </div>
                                        )}
                                    </div>

                                    {showResults && (
                                        <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-blue-500">
                                            <h3 className="font-semibold text-lg mb-2">Quiz Results</h3>
                                            <p className="text-gray-700">
                                                You scored {score} out of {quiz.questions.length} questions correctly
                                                ({Math.round((score / quiz.questions.length) * 100)}%)
                                            </p>
                                            <button
                                                onClick={resetQuiz}
                                                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        {quiz.questions.map((question, questionIndex) => (
                                            <div key={questionIndex} className="bg-white p-6 rounded-lg shadow-sm">
                                                <h3 className="text-lg font-medium mb-4 text-gray-900">
                                                    {questionIndex + 1}. {question.question}
                                                </h3>

                                                <div className="space-y-3">
                                                    {question.options.map((option, optionIndex) => {
                                                        const isSelected = selectedAnswers[questionIndex] === optionIndex;
                                                        const isCorrect = optionIndex === question.correct_answer;
                                                        const isIncorrect = showResults && isSelected && !isCorrect;

                                                        let buttonClass =
                                                            "w-full text-left p-3 rounded-lg border transition-colors ";

                                                        if (showResults) {
                                                            if (isCorrect) {
                                                                buttonClass += "bg-green-100 border-green-300 text-green-800";
                                                            } else if (isIncorrect) {
                                                                buttonClass += "bg-red-100 border-red-300 text-red-800";
                                                            } else {
                                                                buttonClass += "bg-gray-50 border-gray-200 text-gray-600";
                                                            }
                                                        } else {
                                                            if (isSelected) {
                                                                buttonClass +=
                                                                    "bg-blue-100 border-blue-300 text-blue-800";
                                                            } else {
                                                                buttonClass +=
                                                                    "bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
                                                            }
                                                        }

                                                        return (
                                                            <button
                                                                key={optionIndex}
                                                                onClick={() =>
                                                                    handleAnswerSelect(questionIndex, optionIndex)
                                                                }
                                                                className={buttonClass}
                                                                disabled={showResults}
                                                            >
                                                                <span className="font-medium mr-2">
                                                                    {String.fromCharCode(65 + optionIndex)}.
                                                                </span>
                                                                {option}
                                                                {showResults && isCorrect && (
                                                                    <span className="ml-2 text-green-600">✓</span>
                                                                )}
                                                                {showResults && isIncorrect && (
                                                                    <span className="ml-2 text-red-600">✗</span>
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {!showResults && (
                                        <div className="mt-6 text-center">
                                            <button
                                                onClick={handleSubmitQuiz}
                                                disabled={
                                                    Object.keys(selectedAnswers).length !==
                                                    quiz.questions.length
                                                }
                                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Submit Quiz
                                            </button>
                                            <p className="mt-2 text-sm text-gray-600">
                                                Answer all questions to submit
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {catalogs && (
                                <div className="mt-12 pt-12 border-t">
                                    <h2 className="text-2xl font-semibold mb-4">Topics</h2>
                                    {renderCatalogTree(catalogs)}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Container.W1000>
        </div>
    );
}