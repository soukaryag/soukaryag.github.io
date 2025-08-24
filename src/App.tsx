import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
