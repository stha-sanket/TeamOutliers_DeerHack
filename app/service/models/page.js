'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const models = [
  {
    name: 'Human Heart',
    description: 'Explore the anatomy of the human heart.',
    image: '/images/heart.jpg',
    href: '/board/biology/view-3D/heart.glb',
  },
  {
    name: 'Digestive System',
    description: 'Visualize the organs of the human digestive system.',
    image: '/images/digestive-system.jpg',
    href: '/board/biology/view-3D/digestive-system.glb',
  },
  {
    name: 'Dharahara Tower',
    description: 'A 3D model of the historic Dharahara Tower.',
    image: '/images/dharahara.jpg',
    href: '/board/biology/view-3D/dharahara.glb',
  },
];

export default function ModelsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-4">Our 3D Models</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Explore detailed 3D models of various subjects, bringing complex structures to life.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model, index) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={model.href} className="block bg-card rounded-lg border shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden h-full">
              <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{model.name}</h3>
                <p className="text-muted-foreground text-sm">{model.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
