import ChatBot from "./bundles/components/common/ChatBot";
import NavBar from "./bundles/components/common/NavBar";
import Application from "./bundles/context/Application";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Outliers</title>
      </head>
      <body class="overflow-x-hidden">
        <drk className="__drk __main_entry">
          <Application>
            <NavBar />
            {children}
            <ChatBot />
          </Application>
        </drk>
      </body>
    </html>
  );
}
