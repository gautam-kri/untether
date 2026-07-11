import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Cursor from './components/Cursor';
import Landing from './pages/Landing';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Trust from './pages/Trust';
import Reserve from './pages/Reserve';
import Faq from './pages/Faq';

export default function App() {
  return (
    <>
      <Cursor />
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trust" element={<Trust />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </>
  );
}
