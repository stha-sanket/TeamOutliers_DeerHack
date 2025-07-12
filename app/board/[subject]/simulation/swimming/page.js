"use client";

import Link from "next/link"
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
                <div className="mt-5 mb-7 text-center">
                    <h1 className="pri-head text-center">
                        River Crossing <span className="col-pri">Simulation</span>.
                    </h1>
                    <p>An interactive tool to visualize motion across a flowing river. Adjust boat speed and river current to observe real-time path and crossing angle.</p>
                </div>

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
                <div class="mt-16 bg-card p-8 rounded-lg border shadow-sm prose prose-lg max-w-none" style={{ opacity: 1, transform: "none" }}>
                    <h2 class="text-3xl font-bold mb-6">Understanding River Crossing</h2>
                    <p>The River Crossing simulation demonstrates the principles of relative velocity. When a swimmer attempts to cross a river with a current, their effective velocity is the vector sum of their swimming velocity and the river's current velocity.</p>
                    <h3 class="text-2xl font-semibold mt-8 mb-4">Key Concepts &amp; Formulas</h3>
                    <h4>Time to Cross (t):</h4>
                    <p>The time it takes to cross the river depends only on the river's width and the component of the swimmer's velocity perpendicular to the current:</p>
                    <p>
                        <code>t = River Width / Swimmer Speed (perpendicular to current)</code>
                    </p>
                    <h4>Drift Distance (d):</h4>
                    <p>The distance the swimmer is carried downstream by the current:</p>
                    <p>
                        <code>d = Water Speed * Time to Cross</code>
                    </p>
                    <h4>Resultant Velocity (v_r):</h4>
                    <p>The actual velocity of the swimmer relative to the ground, which is the vector sum of the swimmer's speed and the water's speed:</p>
                    <p>
                        <code>v_r = sqrt(Swimmer Speed² + Water Speed²)</code>
                    </p>
                    <h4>Total Distance Traveled:</h4>
                    <p>The actual distance covered by the swimmer along their resultant path:</p>
                    <p>
                        <code>Total Distance = sqrt(River Width² + Drift Distance²)</code>
                    </p>
                    <h3 class="text-2xl font-semibold mt-8 mb-4">Important Considerations</h3>
                    <ul>
                        <li>This simulation assumes the swimmer always aims directly across the river.</li>
                        <li>The river current is uniform across the river's width.</li>
                        <li>The swimmer's speed is constant relative to the water.</li>
                    </ul>
                </div>
                <Link href="/quiz/grade-11/physics/classical-mechanics/foundational-concepts/vectors" className="button-pri block my-5">
                    Take some quiz
                </Link>
            </div>
        </Container.W1000>
    );
}