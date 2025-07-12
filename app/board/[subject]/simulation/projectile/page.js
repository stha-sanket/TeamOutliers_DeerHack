"use client";

import Link from "next/link"
import Container from "@/app/bundles/components/common/container";
import { useEffect, useRef, useState } from "react";

export default function ProjectileMotion() {
    const canvasRef = useRef(null);
    const [velocity, setVelocity] = useState(50);
    const [angle, setAngle] = useState(45);
    const [range, setRange] = useState(0);
    const [maxHeight, setMaxHeight] = useState(0);
    const [timeOfFlight, setTimeOfFlight] = useState(0);

    useEffect(() => {
        updateSimulation();
    }, [velocity, angle]);

    function updateSimulation() {
        const g = 9.8;
        const rad = (angle * Math.PI) / 180;

        const t_flight = s(2 * velocity * Math.sin(rad)) / g;
        const steps = 500;
        const dt = t_flight / steps;

        const x = [];
        const y = [];

        for (let i = 0; i <= steps; i++) {
            const t = i * dt;
            x.push(velocity * Math.cos(rad) * t);
            y.push(velocity * Math.sin(rad) * t - 0.5 * g * t * t);
        }

        const r = (velocity ** 2 * Math.sin(2 * rad)) / g;
        const h = (velocity ** 2 * Math.pow(Math.sin(rad), 2)) / (2 * g);

        setRange(r);
        setMaxHeight(h);
        setTimeOfFlight(t_flight);

        drawTrajectory(x, y);
    }

    function drawTrajectory(x, y) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scaleX = canvas.width / Math.max(...x);
        const scaleY = canvas.height / Math.max(...y);
        const scale = Math.min(scaleX, scaleY) * 0.9;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let i = 0; i < x.length; i++) {
            ctx.lineTo(x[i] * scale, canvas.height - y[i] * scale);
        }
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    return (
        <Container.W1000>
            <div className="p-6">
                <div className="mb-7 mt-5 text-center">
                    <h1 className="pri-head text-center">
                        Projectile Motion <span className="col-pri">Simulate</span>.
                    </h1>
                    <p>An interactive demo that visualizes the curved path of a projectile. Adjust launch angle and speed to see real-time trajectory, range, and height changes.</p>
                </div>

                <div className="flex justify-center mb-8">
                    <canvas
                        ref={canvasRef}
                        className="border w-full rounded-md bg-alt"
                    />
                </div>

                <div className="bg-alt p-5 spacing-x-2 border rounded-md">
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">
                            Initial Velocity:{" "}
                            <span className="text-blue-600">{velocity} m/s</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={velocity}
                            onChange={(e) => setVelocity(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">
                            Launch Angle:{" "}
                            <span className="text-blue-600">{angle}°</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="90"
                            value={angle}
                            onChange={(e) => setAngle(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div className="text-sm text-gray-700 space-y-1 mt-4">
                        <p>
                            <strong>Range:</strong>{" "}
                            <span className="text-blue-600">{range.toFixed(2)} m</span>
                        </p>
                        <p>
                            <strong>Maximum Height:</strong>{" "}
                            <span className="text-blue-600">{maxHeight.toFixed(2)} m</span>
                        </p>
                        <p>
                            <strong>Time of Flight:</strong>{" "}
                            <span className="text-blue-600">{timeOfFlight.toFixed(2)} s</span>
                        </p>
                    </div>
                </div>

                <div class="mt-16 bg-card p-8 rounded-lg border shadow-sm prose prose-lg max-w-none" style={{ opacity: 1, transform: "none" }}>
                    <h2 class="text-3xl font-bold mb-6">Understanding Projectile Motion</h2>
                    <p>Projectile motion is a form of motion experienced by an object or particle (a projectile) that is thrown near the Earth's surface and moves along a curved path under the action of gravity only.</p>
                    <h3 class="text-2xl font-semibold mt-8 mb-4">Key Formulas</h3>
                    <h4>Time of Flight (T):</h4>
                    <p>The total time the projectile remains in the air:</p>
                    <p>
                        <code>T = (2 * v₀ * sin(θ)) / g</code>
                    </p>
                    <h4>Maximum Height (H):</h4>
                    <p>The highest vertical position reached by the projectile:</p>
                    <p>
                        <code>H = (v₀² * sin²(θ)) / (2 * g)</code>
                    </p>
                    <h4>Range (R):</h4>
                    <p>The total horizontal distance covered by the projectile:</p>
                    <p>
                        <code>R = (v₀² * sin(2θ)) / g</code>
                    </p>
                    <p>Where:</p>
                    <ul>
                        <li>
                            <code>v₀</code>: Initial velocity of the projectile</li>
                        <li>
                            <code>θ</code>: Launch angle with respect to the horizontal</li>
                        <li>
                            <code>g</code>: Acceleration due to gravity (approximately 9.8 m/s²)</li>
                    </ul>
                    <h3 class="text-2xl font-semibold mt-8 mb-4">Important Considerations</h3>
                    <ul>
                        <li>This simulation assumes no air resistance.</li>
                        <li>The acceleration due to gravity (g) is constant and acts downwards.</li>
                        <li>The horizontal motion is at a constant velocity.</li>
                        <li>The vertical motion is under constant acceleration (g).</li>
                    </ul>
                </div>
                <Link href="/quiz/grade-11/physics/classical-mechanics/linear-motion-and-forces/kinematics/equations-of-motion-under-gravity" className="button-pri block my-5">
                    Take some quiz
                </Link>
            </div>
        </Container.W1000>
    );
}
