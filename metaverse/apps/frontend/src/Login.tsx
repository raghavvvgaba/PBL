import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
    navigate('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="pixel-grid"></div>
      
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
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

      <div className="scan-line"></div>

      <div className="auth-content">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="back-arrow">←</span> Back to Home
        </button>

        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title glitch" data-text="LOGIN">LOGIN</h1>
            <p className="auth-subtitle">Enter the MetaMeet universe</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-bracket">[</span>
                EMAIL
                <span className="label-bracket">]</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="yourname@example.com"
                required
              />
              <div className="input-line"></div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-bracket">[</span>
                PASSWORD
                <span className="label-bracket">]</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <div className="input-line"></div>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span className="btn-bg"></span>
              <span className="btn-text">ENTER METAVERSE</span>
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-link-text">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="auth-link">
                Sign Up
              </button>
            </p>
          </div>
        </div>

        <div className="decorative-elements">
          <div className="floating-cube cube-1"></div>
          <div className="floating-cube cube-2"></div>
          <div className="floating-cube cube-3"></div>
        </div>
      </div>

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
    </div>
  );
};

export default Login;
