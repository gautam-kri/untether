import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Cursor from './components/Cursor';
import Landing from './pages/Landing';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Trust from './pages/Trust';
import Memory from './pages/Memory';
import Partners from './pages/Partners';
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
        <Route path="/memory" element={<Memory />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </>
  );
}
