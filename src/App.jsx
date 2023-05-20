import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Layout from './pages/Layout'
import Play from './pages/Play'
import Call from './pages/Call'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/*" element={<Layout />} />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/call" element={<Call />} /> */}
        </Routes>
    </BrowserRouter>
  );
};

export default App