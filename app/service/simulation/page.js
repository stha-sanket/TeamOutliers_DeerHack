"use client";

export default function page({ }) {
    return <>
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
    </>
};