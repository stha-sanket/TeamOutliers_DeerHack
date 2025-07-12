"use client";

import Link from "next/link";
import Container from "./bundles/components/common/container";

export default function page({ }) {
  return <>
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <Container.W800 className="mx-auto py-36 block">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Reimagining Learning Through <span className="col-pri underline">Interactivity</span>!</h1>
            <p className="mt-5 text-lg font-medium text-pretty text-gray-500 sm:text-[1.25rem]/2">
              Experience concepts in motion—visualize physics, math, and beyond using augmented reality and 3D simulations.
            </p>
            <div className="mt-5 flex items-center justify-center gap-x-3">
              <Link href="#" className="button-pri">Try a Simulation</Link>
              <Link href="#" className="button-sec">How it works <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Container.W800>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div style={{ opacity: 1, transform: "none" }}>
        <h1 class="text-4xl font-bold text-center mb-4">Our Simulations</h1>
        <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Dive into interactive simulations designed to help you understand complex scientific principles.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/board/physic/simulation/lens">
            <img src="/images/lens.jpg" alt="Lens Simulation" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">Lens Simulation</h3>
              <p class="text-muted-foreground text-sm">Explore how lenses form images.</p>
            </div>
          </a>
        </div>
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/board/physic/simulation/projectile">
            <img src="/images/projectile.jpg" alt="Projectile Motion" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">Projectile Motion</h3>
              <p class="text-muted-foreground text-sm">Analyze the trajectory of objects in motion.</p>
            </div>
          </a>
        </div>
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/board/physic/simulation/swimming">
            <img src="/images/swimming.jpg" alt="River Crossing" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">River Crossing</h3>
              <p class="text-muted-foreground text-sm">Understand relative velocity in river currents.</p>
            </div>
          </a>
        </div>
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/board/physic/simulation/vector">
            <img src="/images/vector.jpg" alt="Vector Operations" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">Vector Operations</h3>
              <p class="text-muted-foreground text-sm">Visualize vector addition, subtraction, and dot products.</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div style={{ opacity: 1, transform: "none" }}>
        <h1 class="text-4xl font-bold text-center mb-4">Solve Quiz's</h1>
        <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Dive into interactive simulations designed to help you understand complex scientific principles.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/quiz/grade-11/physics/">
            <img src="/images/projectile.jpg" alt="Projectile Motion" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">Projectile Motion</h3>
              <p class="text-muted-foreground text-sm">Analyze the trajectory of objects in motion.</p>
            </div>
          </a>
        </div>
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/quiz/grade-11/physics/">
            <img src="/images/vector.jpg" alt="Vector Operations" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">Vector Operations</h3>
              <p class="text-muted-foreground text-sm">Visualize vector addition, subtraction, and dot products.</p>
            </div>
          </a>
        </div>
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/quiz/grade-11/physics/">
            <img src="/images/lens.jpg" alt="Lens Simulation" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">Lens Simulation</h3>
              <p class="text-muted-foreground text-sm">Explore how lenses form images.</p>
            </div>
          </a>
        </div>
        <div style={{ opacity: 1, transform: "none" }}>
          <a class="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full" href="/quiz/grade-11/physics/">
            <img src="/images/swimming.jpg" alt="River Crossing" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-card-foreground mb-2">River Crossing</h3>
              <p class="text-muted-foreground text-sm">Understand relative velocity in river currents.</p>
            </div>
          </a>
        </div>
      </div>
    </div>

    {/* Tech Stack */}
    <div className="bg-gray-50 py-24 sm:py-32">
      <Container.W1400>
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-900">Built With Modern Web Tech</h2>
          <p className="mt-4 text-lg text-gray-600">Under the hood: WebXR, Three.js, AR.js, and Next.js power seamless, immersive learning.</p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <TechCard name="AR.js" desc="Marker-based augmented reality that works directly in the browser." />
          <TechCard name="Three.js" desc="High-performance 3D rendering to create smooth and rich simulations." />
          <TechCard name="Next.js" desc="Fast and scalable frontend built with React and server-side rendering." />
          <TechCard name="Tailwind CSS" desc="Utility-first styling to maintain consistency and responsiveness." />
        </div>
      </Container.W1400>
    </div>

    {/* Who Is It For */}
    <div className="bg-white py-24 sm:py-32">
      <Container.W1400>
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-900">Who Is It For?</h2>
          <p className="mt-4 text-lg text-gray-600">Whether you're a student, teacher, or curious learner—this platform is for you.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <AudienceCard label="👩‍🎓 Students" desc="Grasp difficult topics faster through motion and visualization." />
          <AudienceCard label="👨‍🏫 Teachers" desc="Use simulations to demonstrate core ideas interactively in class." />
          <AudienceCard label="🧠 Self-Learners" desc="Experiment, observe, and reinforce concepts at your own pace." />
        </div>
      </Container.W1400>
    </div>

    {/* Why Interactivity Works */}
    <div className="bg-gray-50 py-24 sm:py-32">
      <Container.W1400>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-gray-900">Why Interactivity Matters</h2>
          <p className="mt-6 text-lg text-gray-700">
            Studies show that visual and hands-on learning enhances understanding, boosts memory, and builds intuition.
            By transforming abstract concepts into live, manipulatable systems, we help learners <em>see</em> the logic behind the formulas.
          </p>
        </div>
      </Container.W1400>
    </div>

    {/* Get Involved */}
    <div className="bg-white py-24 sm:py-32">
      <Container.W1400>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-gray-900">Want to Contribute or Give Feedback?</h2>
          <p className="mt-6 text-lg text-gray-600">
            We're building this platform openly. Share your ideas, suggest new simulations, or collaborate on code and design.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="#" className="button-pri">Join the Project</Link>
            <Link href="#" className="button-sec">Submit Feedback</Link>
          </div>
        </div>
      </Container.W1400>
    </div>
  </>;
}

// --- Reusable card components ---
function SimulationCard({ title, desc, href }) {
  return (
    <Link href={href} className="block border rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </Link>
  );
}

function TechCard({ name, desc }) {
  return (
    <div className="p-4">
      <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}

function AudienceCard({ label, desc }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <div className="text-3xl mb-3">{label}</div>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}