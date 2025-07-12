"use client";

import Link from "next/link";
import { useState } from "react";

function vectorLength([x, y]) {
  return Math.sqrt(x * x + y * y);
}

function dotProduct([ax, ay], [bx, by]) {
  return ax * bx + ay * by;
}

function angleBetweenVectors(a, b) {
  const dot = dotProduct(a, b);
  const magA = vectorLength(a);
  const magB = vectorLength(b);
  if (magA === 0 || magB === 0) return 0;
  let cosTheta = dot / (magA * magB);
  cosTheta = Math.min(1, Math.max(-1, cosTheta)); // clamp
  return (Math.acos(cosTheta) * 180) / Math.PI;
}

function projection(a, b) {
  const dot = dotProduct(a, b);
  const dotA = dotProduct(a, a);
  if (dotA === 0) return [0, 0];
  const scale = dot / dotA;
  return [a[0] * scale, a[1] * scale];
}

export default function DotProductCalculator() {
  const [aX, setAX] = useState(0);
  const [aY, setAY] = useState(0);
  const [bX, setBX] = useState(0);
  const [bY, setBY] = useState(0);

  const vectorA = [aX, aY];
  const vectorB = [bX, bY];
  const dotProd = dotProduct(vectorA, vectorB).toFixed(2);
  const angle = angleBetweenVectors(vectorA, vectorB).toFixed(2);
  const proj = projection(vectorA, vectorB);

  // SVG drawing constants
  const SVG_SIZE = 400;
  const ORIGIN = SVG_SIZE / 2;
  const SCALE = 15; // scale factor for vectors to fit nicely

  // Convert vector coordinates to SVG points (origin centered)
  function toSVGCoords([x, y]) {
    return [ORIGIN + x * SCALE, ORIGIN - y * SCALE]; // invert y for SVG coords
  }

  // Arrow marker for SVG
  const arrowMarker = (
    <marker
      id="arrow"
      markerWidth="10"
      markerHeight="7"
      refX="10"
      refY="3.5"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M0,0 L10,3.5 L0,7 Z" fill="#333" />
    </marker>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans text-gray-800">
      <div className="mb-7 mt-5 text-center">
        <h1 className="pri-head text-center">
          Dot Product <span className="col-pri">Calculator & Visualizer</span>.
        </h1>
        <p>A tool that calculates the dot product of two vectors and visualizes their directions. Instantly see how angle and magnitude affect the result.</p>
      </div>

      <div className="border bg-alt mb-14 mx-auto" style={{ maxWidth: SVG_SIZE }}>
        <svg
          className="mx-auto border border-gray-300 rounded w-full"
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          width="100%"
          height={SVG_SIZE}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>{arrowMarker}</defs>

          {/* Axes */}
          <line
            x1={0}
            y1={ORIGIN}
            x2={SVG_SIZE}
            y2={ORIGIN}
            stroke="#888"
            strokeWidth="1"
          />
          <line
            x1={ORIGIN}
            y1={0}
            x2={ORIGIN}
            y2={SVG_SIZE}
            stroke="#888"
            strokeWidth="1"
          />

          {/* X axis ticks and labels */}
          {Array.from({ length: 21 }, (_, i) => {
            const val = i - 10; // from -10 to +10
            const x = ORIGIN + val * SCALE;
            return (
              <g key={"xtick" + val}>
                {/* Tick mark */}
                <line
                  x1={x}
                  y1={ORIGIN - 5}
                  x2={x}
                  y2={ORIGIN + 5}
                  stroke="#666"
                  strokeWidth="1"
                />
                {/* Label */}
                <text
                  x={x}
                  y={ORIGIN + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#444"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Y axis ticks and labels */}
          {Array.from({ length: 21 }, (_, i) => {
            const val = 10 - i; // from +10 down to -10
            const y = ORIGIN + val * SCALE * -1; // invert y direction
            return (
              <g key={"ytick" + val}>
                {/* Tick mark */}
                <line
                  x1={ORIGIN - 5}
                  y1={y}
                  x2={ORIGIN + 5}
                  y2={y}
                  stroke="#666"
                  strokeWidth="1"
                />
                {/* Label */}
                {val !== 0 && (
                  <text
                    x={ORIGIN - 10}
                    y={y + 4} // vertical align text
                    textAnchor="end"
                    fontSize="10"
                    fill="#444"
                  >
                    {val}
                  </text>
                )}
              </g>
            );
          })}

          {/* Vector A - red */}
          <line
            x1={ORIGIN}
            y1={ORIGIN}
            x2={toSVGCoords(vectorA)[0]}
            y2={toSVGCoords(vectorA)[1]}
            stroke="red"
            strokeWidth="3"
            markerEnd="url(#arrow)"
          />
          {/* Vector B - blue */}
          <line
            x1={ORIGIN}
            y1={ORIGIN}
            x2={toSVGCoords(vectorB)[0]}
            y2={toSVGCoords(vectorB)[1]}
            stroke="blue"
            strokeWidth="3"
            markerEnd="url(#arrow)"
          />
          {/* Projection of B on A - green */}
          <line
            x1={ORIGIN}
            y1={ORIGIN}
            x2={toSVGCoords(proj)[0]}
            y2={toSVGCoords(proj)[1]}
            stroke="green"
            strokeWidth="3"
            markerEnd="url(#arrow)"
          />
        </svg>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">
          Dot Product: <span className="col-pri">{dotProd}</span>
        </p>
        <p className="text-lg font-semibold">
          Angle Between Vectors (degrees):{" "}
          <span className="col-pri">{angle}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-1" htmlFor="a_x">
            Vector A (x):
          </label>
          <input
            type="range"
            id="a_x"
            min="-10"
            max="10"
            step="0.1"
            value={aX}
            onChange={(e) => setAX(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-1 text-blue-600">{aX}</div>
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="a_y">
            Vector A (y):
          </label>
          <input
            type="range"
            id="a_y"
            min="-10"
            max="10"
            step="0.1"
            value={aY}
            onChange={(e) => setAY(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-1 text-blue-600">{aY}</div>
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="b_x">
            Vector B (x):
          </label>
          <input
            type="range"
            id="b_x"
            min="-10"
            max="10"
            step="0.1"
            value={bX}
            onChange={(e) => setBX(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-1 text-blue-600">{bX}</div>
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="b_y">
            Vector B (y):
          </label>
          <input
            type="range"
            id="b_y"
            min="-10"
            max="10"
            step="0.1"
            value={bY}
            onChange={(e) => setBY(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-1 text-blue-600">{bY}</div>
        </div>
      </div>

      <div className="para fcc gap-5 ">
        <div className="fcc">
          <span className="inline-block w-3 h-3 bg-red-500 mr-1 align-middle">
          </span> Vector A
        </div>
        <div className="fcc">
          <span className="inline-block w-3 h-3 bg-blue-500 mr-1 align-middle">
          </span> Vector B
        </div>
        <div className="fcc">
          <span className="inline-block w-3 h-3 bg-green-500 mr-1 align-middle">
          </span> Projection of B on A
        </div>
      </div>

      <div class="mt-16 bg-card p-8 rounded-lg border shadow-sm prose prose-lg max-w-none" style={{ opacity: 1, transform: "none" }}>
        <h2 class="text-3xl font-bold mb-6">Understanding Vectors and Dot Products</h2>
        <p>Vectors are mathematical objects that have both magnitude (length) and direction. They are used extensively in physics and engineering to represent quantities like force, velocity, and displacement.</p>
        <h3 class="text-2xl font-semibold mt-8 mb-4">Key Concepts &amp; Formulas</h3>
        <h4>Vector Representation:</h4>
        <p>A 2D vector can be represented as <code>A = (Ax, Ay)</code>, where <code>Ax</code> and <code>Ay</code> are its components along the x and y axes.</p>
        <h4>Dot Product:</h4>
        <p>The dot product (also known as the scalar product) of two vectors <code>A</code> and <code>B</code> is a scalar quantity given by:</p>
        <p>
          <code>A · B = Ax * Bx + Ay * By</code>
        </p>
        <p>Alternatively, it can be defined as:</p>
        <p>
          <code>A · B = |A| |B| cos(θ)</code>
        </p>
        <p>Where:</p>
        <ul>
          <li>
            <code>|A|</code> and <code>|B|</code> are the magnitudes (lengths) of vectors A and B.</li>
          <li>
            <code>θ</code> is the angle between vectors A and B.</li>
        </ul>
        <p>The dot product tells us about the angle between two vectors. If the dot product is:</p>
        <ul>
          <li>Positive: The angle between the vectors is acute (less than 90°).</li>
          <li>Zero: The vectors are perpendicular (orthogonal).</li>
          <li>Negative: The angle between the vectors is obtuse (greater than 90°).</li>
        </ul>
        <h4>Angle Between Vectors:</h4>
        <p>The angle <code>θ</code> between two non-zero vectors <code>A</code> and <code>B</code> can be found using the dot product formula:</p>
        <p>
          <code>cos(θ) = (A · B) / (|A| |B|)</code>
        </p>
        <p>So, <code>θ = arccos((A · B) / (|A| |B|))</code>
        </p>
        <h4>Vector Projection:</h4>
        <p>The projection of vector <code>B</code> onto vector <code>A</code> (denoted as <code>proj_A B</code>) is the component of <code>B</code> that lies in the direction of <code>A</code>. It is a vector given by:</p>
        <p>
          <code>proj_A B = ((A · B) / |A|²) * A</code>
        </p>
        <p>This represents how much of vector B acts in the direction of vector A.</p>
      </div>
      <Link href="/quiz/grade-11/physics/classical-mechanics/foundational-concepts/vectors/vector-components" className="button-pri block my-5">
          Take some quiz
      </Link>
    </div>
  );
}
