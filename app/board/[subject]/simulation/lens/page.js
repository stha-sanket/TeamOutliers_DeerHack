"use client"

import { useEffect, useRef, useState } from "react";
import Container from "@/app/bundles/components/common/container";
import useAppAPIServer from "@/app/bundles/Hooks/useAppAPI";
import Link from "next/link";

export default function page() {
    const server = useAppAPIServer();

    const canvasRef = useRef(null);
    const [lensType, setLensType] = useState("convex");
    const [objectDistance, setObjectDistance] = useState(150);
    const [focalLength, setFocalLength] = useState(100);

    useEffect(() => {
        draw();
    }, [lensType, objectDistance, focalLength]);

    async function draw() {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const lensX = canvas.width / 2;
        const lensY = canvas.height / 2;

        // Principal axis
        ctx.beginPath();
        ctx.moveTo(0, lensY);
        ctx.lineTo(canvas.width, lensY);
        ctx.stroke();

        // Draw lens
        ctx.beginPath();
        if (lensType === "convex") {
            ctx.moveTo(lensX, lensY - 50);
            ctx.quadraticCurveTo(lensX + 30, lensY, lensX, lensY + 50);
            ctx.quadraticCurveTo(lensX - 30, lensY, lensX, lensY - 50);
            ctx.stroke();
        } else {
            ctx.moveTo(lensX - 30, lensY - 50);
            ctx.quadraticCurveTo(lensX - 10, lensY, lensX - 30, lensY + 50);
            ctx.moveTo(lensX + 30, lensY - 50);
            ctx.quadraticCurveTo(lensX + 10, lensY, lensX + 30, lensY + 50);
            ctx.stroke();
        }

        // Focal points
        ctx.beginPath();
        ctx.arc(lensX - focalLength, lensY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lensX + focalLength, lensY, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Object
        const objectX = lensX - objectDistance;
        const objectY = lensY - 50;
        ctx.beginPath();
        ctx.moveTo(objectX, objectY);
        ctx.lineTo(objectX, lensY);
        ctx.stroke();

        const { image_distance } = await server.POST(`/v1/board/physics/lens/calculate`, {
            lens_type: lensType,
            object_distance: objectDistance,
            focal_length: focalLength,
        });

        const imageX = lensX + image_distance;
        const magnification = image_distance / -objectDistance;
        const imageHeight = 50 * magnification;
        const imageY = lensY - imageHeight;

        ctx.beginPath();
        ctx.moveTo(imageX, imageY);
        ctx.lineTo(imageX, lensY);
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.strokeStyle = "black";
    }

    return (
        <Container.W1000>
            <div className="mb-10">
                <div className="fcc mb-7 flex-col text-center mt-5">
                    <h1 className="pri-head text-center">
                        Lens <span className="col-pri">Simulation</span>.
                    </h1>
                    <p>An interactive demo showing how convex and concave lenses form images. Adjust object distance and focal length to see real-time ray and image changes.</p>
                </div>

                <div className="flex justify-center mb-8">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={400}
                        className="border rounded-md bg-alt"
                    />
                </div>

                <div className="bg-alt p-5 spacing-x-2 border rounded-md">
                    <div className="mb-3">
                        <label className="block mb-1 font-medium text-gray-700">Lens Type:</label>
                        <select
                            value={lensType}
                            onChange={(e) => setLensType(e.target.value)}
                            className="w-full m-0 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        >
                            <option value="convex">Convex</option>
                            <option value="concave">Concave</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Object Distance: <span className="text-blue-600">{objectDistance}px</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={400}
                            value={objectDistance}
                            onChange={(e) => setObjectDistance(Number(e.target.value))}
                            className="w-full m-0"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Focal Length: <span className="text-blue-600">{focalLength}px</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={200}
                            value={focalLength}
                            onChange={(e) => setFocalLength(Number(e.target.value))}
                            className="w-full m-0"
                        />
                    </div>
                </div>

                <div class="mt-16 bg-card p-8 rounded-lg border shadow-sm prose prose-lg max-w-none" style={{ opacity: 1, transform: "none" }}>
                    <h2 class="text-3xl font-bold mb-6">Understanding Lenses</h2>
                    <p>Lenses are optical devices that refract light to form images. They are fundamental to many optical instruments, from eyeglasses to telescopes.</p>
                    <h3 class="text-2xl font-semibold mt-8 mb-4">Key Concepts &amp; Formulas</h3>
                    <h4>Lens Formula:</h4>
                    <p>The relationship between object distance (u), image distance (v), and focal length (f) is given by the lens formula:</p>
                    <p>
                        <code>1/f = 1/v - 1/u</code>
                    </p>
                    <ul>
                        <li>
                            <code>f</code>: Focal length of the lens. Positive for convex, negative for concave.</li>
                        <li>
                            <code>u</code>: Object distance from the optical center. Always negative as per convention (object is real and placed on the left).</li>
                        <li>
                            <code>v</code>: Image distance from the optical center. Positive for real images (formed on the right), negative for virtual images (formed on the left).</li>
                    </ul>
                    <h4>Magnification:</h4>
                    <p>Magnification (M) describes how much larger or smaller an image is compared to the object, and whether it is inverted or upright:</p>
                    <p>
                        <code>M = h'/h = v/u</code>
                    </p>
                    <ul>
                        <li>
                            <code>h'</code>: Height of the image.</li>
                        <li>
                            <code>h</code>: Height of the object.</li>
                        <li>If <code>M</code> is positive, the image is upright. If negative, it's inverted.</li>
                        <li>If <code>|M| &gt; 1</code>, the image is magnified. If <code>|M| &lt; 1</code>, it's diminished.</li>
                    </ul>
                    <h3 class="text-2xl font-semibold mt-8 mb-4">Types of Lenses</h3>
                    <ul>
                        <li>
                            <strong>Convex Lens (Converging Lens):</strong> Thicker in the middle, converges parallel rays of light. Can form both real and virtual images depending on object position.</li>
                        <li>
                            <strong>Concave Lens (Diverging Lens):</strong> Thinner in the middle, diverges parallel rays of light. Always forms virtual, upright, and diminished images.</li>
                    </ul>
                </div>
                <Link href="/quiz/grade-11/physics/wave-and-optics/refraction/lenses" className="button-pri block my-5">
                    Take some quiz
                </Link>
            </div>
        </Container.W1000>
    );
}
