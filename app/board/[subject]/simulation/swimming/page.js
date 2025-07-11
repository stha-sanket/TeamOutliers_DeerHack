"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/app/bundles/components/common/container";

export default function RiverSimulation() {
    const canvasRef = useRef(null);
    const animationRef = useRef();
    const [riverWidth, setRiverWidth] = useState(10);
    const [swimmerSpeed, setSwimmerSpeed] = useState(2);
    const [waterSpeed, setWaterSpeed] = useState(1);

    const [time, setTime] = useState(0);
    const [drift, setDrift] = useState(0);
    const [resultantVelocity, setResultantVelocity] = useState(0);
    const [totalDistance, setTotalDistance] = useState(0);

    const swimmer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        resizeCanvas();
        updateValues();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [riverWidth]);

    useEffect(() => {
        updateValues();
    }, [riverWidth, swimmerSpeed, waterSpeed]);

    function resizeCanvas() {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = Math.min(riverWidth * 10, 500);
            swimmer.current = { x: canvas.width / 2, y: 0 };
            draw();
        }
    }

    function updateValues() {
        const timeToCross = riverWidth / swimmerSpeed;
        const driftDistance = waterSpeed * timeToCross;
        const vResult = Math.sqrt(swimmerSpeed ** 2 + waterSpeed ** 2);
        const distance = Math.sqrt(riverWidth ** 2 + driftDistance ** 2);

        setTime(timeToCross);
        setDrift(driftDistance);
        setResultantVelocity(vResult);
        setTotalDistance(distance);
        resizeCanvas();
    }

    function draw() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "24px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("\ud83c\udfca", swimmer.current.x, swimmer.current.y);
    }

    function animate() {
        const canvas = canvasRef.current;
        const timeToCross = riverWidth / swimmerSpeed;
        const driftDistance = waterSpeed * timeToCross;

        const ySpeed = canvas.height / timeToCross;
        const xSpeed = (driftDistance / riverWidth) * canvas.height / timeToCross;

        swimmer.current.y += ySpeed / 60;
        swimmer.current.x += xSpeed / 60;

        if (swimmer.current.y < canvas.height) {
            draw();
            animationRef.current = requestAnimationFrame(animate);
        } else {
            draw();
        }
    }

    function startAnimation() {
        cancelAnimationFrame(animationRef.current);
        const canvas = canvasRef.current;
        swimmer.current = { x: canvas.width / 2, y: 0 };
        draw();
        animationRef.current = requestAnimationFrame(animate);
    }

    return (
        <Container.W1000>
            <div className="p-6">
                <h1 className="pri-head text-center mb-6">
                    River Crossing <span className="col-pri">Simulation</span>.
                </h1>
                
                <div className="flex flex-col gap-6">
                    <div className="flex-1 border bg-sky-200 rounded-md">
                        <canvas ref={canvasRef} className="w-full h-auto block" />
                    </div>

                    <div className="flex-1 bg-alt p-5 border rounded-md">
                        <h2 className="font-semibold text-xl mb-4">Controls</h2>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">
                                River Width: <span className="text-blue-600">{riverWidth} m</span>
                            </label>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                value={riverWidth}
                                onChange={(e) => setRiverWidth(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">
                                Swimmer Speed: <span className="text-blue-600">{swimmerSpeed} m/s</span>
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={swimmerSpeed}
                                onChange={(e) => setSwimmerSpeed(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">
                                Water Speed: <span className="text-blue-600">{waterSpeed} m/s</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={waterSpeed}
                                onChange={(e) => setWaterSpeed(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <button
                            onClick={startAnimation}
                            className="button-pri"
                        >
                            Start / Reset Animation
                        </button>

                        <div className="mt-6 text-sm text-gray-800 space-y-1">
                            <p>
                                <strong>Time to Cross:</strong>{" "}
                                <span className="text-blue-600">{time.toFixed(2)} s</span>
                            </p>
                            <p>
                                <strong>Drift Distance:</strong>{" "}
                                <span className="text-blue-600">{drift.toFixed(2)} m</span>
                            </p>
                            <p>
                                <strong>Resultant Velocity:</strong>{" "}
                                <span className="text-blue-600">{resultantVelocity.toFixed(2)} m/s</span>
                            </p>
                            <p>
                                <strong>Total Distance Travelled:</strong>{" "}
                                <span className="text-blue-600">{totalDistance.toFixed(2)} m</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container.W1000>
    );
}