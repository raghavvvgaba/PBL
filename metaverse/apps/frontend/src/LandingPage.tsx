import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;

  return (
    <div className="landing-container">
      <div className="pixel-grid"></div>
      
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div 
        className="parallax-layer layer-1"
        style={{
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`
        }}
      >
        <div className="pixel-character character-1"></div>
        <div className="pixel-character character-2"></div>
        <div className="pixel-character character-3"></div>
      </div>

      <div 
        className="parallax-layer layer-2"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`
        }}
      >
        <div className="floating-platform platform-1"></div>
        <div className="floating-platform platform-2"></div>
      </div>

      <main className={`main-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="glitch-wrapper">
          <h1 className="title glitch" data-text="METAMEET">
            METAMEET
          </h1>
        </div>
        
        <div className="subtitle-container">
          <p className="subtitle">
            <span className="pixel-bracket">&lt;</span>
            <span className="typewriter">Meet Your Friends in the 2D Metaverse</span>
            <span className="pixel-bracket">&gt;</span>
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎮</div>
            <h3>2D Avatar World</h3>
            <p>Create your pixel avatar and explore infinite virtual spaces</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Real-Time Hangouts</h3>
            <p>Connect instantly with friends in interactive 2D environments</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Custom Rooms</h3>
            <p>Build and design your own spaces for unique gatherings</p>
          </div>
        </div>

        <div className="cta-section">
          <button className="cta-button primary-cta" onClick={() => navigate('/login')}>
            <span className="button-bg"></span>
            <span className="button-text">Enter MetaMeet</span>
            <div className="button-particles"></div>
          </button>
          
          <button className="cta-button secondary-cta" onClick={() => navigate('/signup')}>
            <span className="button-text">Sign Up</span>
          </button>
        </div>

        <div className="stats-bar">
          <div className="stat">
            <span className="stat-value">1,000+</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">500+</span>
            <span className="stat-label">Virtual Rooms</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Online</span>
          </div>
        </div>
      </main>

      <div className="scan-line"></div>
      
      <div className="corner-ui top-left">
        <div className="ui-bracket"></div>
      </div>
      <div className="corner-ui top-right">
        <div className="ui-bracket"></div>
      </div>
      <div className="corner-ui bottom-left">
        <div className="ui-bracket"></div>
      </div>
      <div className="corner-ui bottom-right">
        <div className="ui-bracket"></div>
      </div>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">MetaMeet</h3>
            <p className="footer-description">
              Connect with fellow friends and embark on unforgettable adventures together in the 2D metaverse.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links">
              <a href="#instagram" className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="#facebook" className="social-link" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="#twitter" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 MetaMeet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
