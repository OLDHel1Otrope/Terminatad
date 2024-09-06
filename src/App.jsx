import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Eliminated from './Eliminated';
import Development from './Development';
import Login from './Login';
import Services from './Services';
import { FirebaseProvider } from './context/Firebase';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eliminated" element={<Eliminated />} />
            <Route path="/about" element={<About />} />
            <Route path="/development" element={<Development />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;