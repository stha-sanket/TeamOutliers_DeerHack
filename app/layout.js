import ChatBot from "./bundles/components/common/ChatBot";
import Footer from "./bundles/components/common/Fotter";
import NavBar from "./bundles/components/common/NavBar";
import Application from "./bundles/context/Application";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ConceptC - Reimagining Education with Interactive Simulations & Augmented Reality</title>
        <link rel="shortcut icon" href="/icon.ico" type="image/x-icon" />
        <meta name="description" content="Explore immersive physics and biology concepts through real-time simulations, 3D models, and AR. Built with AR.js, Three.js, and Next.js—designed for students, teachers, and self-learners seeking deeper understanding through motion and interactivity." />
      </head>
      <body class="overflow-x-hidden">
        <drk className="__drk __main_entry">
          <Application>
            <NavBar />
            <main className="__content_entry">
              {children}
            </main>
            <ChatBot />
            <Footer />
          </Application>
        </drk>
      </body>
    </html>
  );
}
