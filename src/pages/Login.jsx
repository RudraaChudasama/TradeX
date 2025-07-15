import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, QrCode } from 'lucide-react';
import './Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isQrLogin, setIsQrLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-tabs">
            <button 
              className={`tab-btn ${!isQrLogin ? 'active' : ''}`}
              onClick={() => setIsQrLogin(false)}
            >
              Email Login
            </button>
            <button 
              className={`tab-btn ${isQrLogin ? 'active' : ''}`}
              onClick={() => setIsQrLogin(true)}
            >
              QR Code Login
            </button>
          </div>
        </div>

        {isQrLogin ? (
          <div className="qr-section">
            <QrCode size={180} className="qr-placeholder" />
            <p className="qr-text">Scan with TradeX mobile app</p>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password" 
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-button">Log In</button>

            <p className="register-text">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;