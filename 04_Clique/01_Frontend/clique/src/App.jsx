import { Suspense, useEffect } from "react";
import "./App.css";

// Importing Clerk Functionality
import { ClerkProvider } from '@clerk/clerk-react';
// Importing React Router
import { Route, Routes } from "react-router-dom";

// Dynamically import Bootstrap's JS to reduce initial bundle
// and only load it on the client when needed
function useBootstrap() {
  useEffect(() => {
    // Load Bootstrap JS asynchronously
    import("bootstrap").catch(() => {
      // No-op: avoid breaking the app if Bootstrap fails to load
    });
  }, []);
}

// Lazily import pages for route-based code splitting
import React from 'react';
const LandingPage = React.lazy(() => import('./01_Pages/LandingPage.jsx'));
const About = React.lazy(() => import('./01_Pages/About.jsx'));
const UserProfile = React.lazy(() => import('./01_Pages/UserProfile.jsx'));
const ChatsPage = React.lazy(() => import('./01_Pages/ChatsPage.jsx'));
const SeeMyChats = React.lazy(() => import('./01_Pages/SeeMyChats.jsx'));

// navbar and footer
import Footer from './components/Footer.jsx';
import Nav from './components/Nav.jsx';

// set the publishable key form .env
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  // Initialize dynamic Bootstrap JS load
  useBootstrap();

  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        {/* persistent Navbar */}
        <Nav />

        <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/chat/:id" element={<ChatsPage />} />
            <Route path="/cliques" element={<SeeMyChats />} />
            {/* Route to handle when the user tries to access a page that doesn't exist */}
            <Route
              path="*"
              element={<h3 style={{ color: "red" }}> Not Found! </h3>}
            />
          </Routes>
        </Suspense>
        {/* persistent Footer */}
        <Footer />
      </ClerkProvider>
    </>
  );
}

export default App;
