
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="glass-panel p-12 max-w-2xl mx-auto text-center">
          <Zap className="h-16 w-16 text-glow-pink mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl font-bold mb-6 neon-text">404</h1>
          <p className="text-xl text-white/80 mb-8">
            This crypto token has vanished into the digital ether
          </p>
          <Link to="/" className="futuristic-button inline-block">
            Return to Earth
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
