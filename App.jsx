import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout';
import Home from './pages/home';
import Nearby from './pages/nearby';
import Profile from './pages/profile';
import About from './pages/about';
import OnboardingPage from './pages/onboarding';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route
            path="/*"
            element={
              <Routes>
                <Route path="/home" element={<Layout currentPageName="Home"><Home /></Layout>} />
                <Route path="/nearby" element={<Layout currentPageName="Nearby"><Nearby /></Layout>} />
                <Route path="/profile" element={<Layout currentPageName="Profile"><Profile /></Layout>} />
                <Route path="/about" element={<Layout currentPageName="About"><About /></Layout>} />
                <Route path="/" element={<Navigate to="/home" replace />} />
              </Routes>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
