import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillLinkedin } from 'react-icons/ai';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="mx-auto flex flex-col min-h-screen relative">
        <header className="sticky top-0 z-40 bg-black bg-opacity-50">
          <div className="container flex justify-between items-center h-16 py-4">
            <div className="flex-1 text-center">
              <h1 className="text-green-400 font-mono text-3xl">
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Iustus<span className="text-yellow-400">AI</span>
                </Link>
              </h1>
            </div>
            <div>
              <Link
                to="/contact-sales"
                className="text-green-400 font-mono text-sm hover:underline"
              >
                Vertrieb kontaktieren
              </Link>
            </div>
          </div>
        </header>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
        <footer className="sticky bottom-0 z-40 bg-black bg-opacity-50">
          <div className="container h-16 py-4 flex justify-center items-center">
            <div className="flex space-x-4 justify-start w-full">
              <Link className="text-green-400 font-mono text-sm hover:underline" to="/impressum">
                Impressum
              </Link>
              <Link className="text-green-400 font-mono text-sm hover:underline" to="/agb">
                AGB
              </Link>
              <Link className="text-green-400 font-mono text-sm hover:underline" to="/datenschutzerklärung">
                Datenschutzerklärung
              </Link>
              <Link className="text-green-400 font-mono text-sm hover:underline" to="/cookierichtlinie">
                Cookie-Richtlinie
              </Link>
            </div>
            <div>
              <a
                className="text-green-400 font-mono text-3xl hover:underline"
                href="https://www.linkedin.com/in/your-linkedin-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillLinkedin />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
