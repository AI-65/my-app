import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import ContactForm from './components/contactForm';
import MatrixRain from './components/matrixrain';
import { AiFillSchedule } from 'react-icons/ai';
import Impressum from './components/Impressum'; // or wherever your Impressum component is located
import Datenschutzerklärung from './components/Datenschutzerklärung';
import Cookierichtlinie from './components/Cookierichtlinie';
import Agb from './components/Agb';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Router>
      <Layout>
        <MatrixRain /> {/* Move the MatrixRain component here */}
        <Routes>
          <Route path="/" element={
            <div className="relative h-screen">
              <button
                className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-3 font-mono text-sm bg-purple-600 text-white hover:bg-purple-700"
                onClick={() => setShowForm(!showForm)}
              >
                <AiFillSchedule className="mr-2" />
                Demo anfordern
              </button>
              {showForm && <ContactForm onClose={() => setShowForm(false)} />}
            </div>
          } />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/agb" element={<Agb />} />
          <Route path="/datenschutzerklärung" element={<Datenschutzerklärung />} />
          <Route path="/cookierichtlinie" element={<Cookierichtlinie />} />
          {/* Add other routes as required */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
