import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AudioVideoAnalytics, Dashboard, FunctionalTesting, LoginForm, Reports } from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/audio-video-analytics" element={<AudioVideoAnalytics />} />
          <Route path="/FunctionalTesting" element={<FunctionalTesting />} />
          <Route path="/Reports" element={<Reports />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
