"use client"

import { useEffect, useRef, useState } from "react";
import Container from "@/app/bundles/components/common/container";
import useAppAPIServer from "@/app/bundles/Hooks/useAppAPI";

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
            <div className="p-6">
                <h1 className="pri-head text-center mb-4">
                    Lens <span className="col-pri">Simulation</span>.
                </h1>

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
            </div>
        </Container.W1000>
    );
}
