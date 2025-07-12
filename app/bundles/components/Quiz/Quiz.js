import { useState } from 'react';

export default function Quiz({ __questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState([]);

    const questions = __questions

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        const newAnswers = [...answers, selectedAnswer];
        setAnswers(newAnswers);

        if (selectedAnswer === questions[currentQuestion].correct) {
            setScore(score + 1);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer('');
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setScore(0);
        setShowResult(false);
        setAnswers([]);
    };

    if (showResult) {
        return (
            <div className="w-full mx-auto my-5 p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
                    <div className="text-6xl mb-4">
                        {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '📚'}
                    </div>
                    <p className="text-xl text-gray-600 mb-6">
                        You scored {score} out of {questions.length}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                        <div
                            className="bg-pri h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(score / questions.length) * 100}%` }}
                        ></div>
                    </div>
                    <button
                        onClick={resetQuiz}
                        className="bg-pri hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                        Take Quiz Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto my-5 p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-pri h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                    {questions[currentQuestion].question}
                </h2>
            </div>

            <div className="space-y-3 mb-6">
                {questions[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${selectedAnswer === option
                            ? 'border-pri bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <span className="font-medium">{option}</span>
                    </button>
                ))}
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`py-3 px-6 rounded-lg font-medium transition-all duration-200 ${selectedAnswer
                        ? 'bg-pri hover:bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}