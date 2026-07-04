import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Landing from './pages/Landing';
import Team from './pages/Team';
import Contact from './pages/Contact';

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
