import React, { useState } from 'react';
import '../Components.css';

function Login({ onLogin, errorMessage }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp ? 'http://127.0.0.1:8000/api/signup/' : 'http://127.0.0.1:8000/api/login/';
    const body = isSignUp ? { username, email, password, is_admin: isAdmin } : { username, password };


    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        if (isSignUp) {
          setIsSignUp(false);
        } else {
          onLogin(data);
        }
      } else {
        alert(`Error: ${data.error || 'Something went wrong!'}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card-switch">
        <label className="login-switch">
          <input className="login-toggle" type="checkbox" checked={isSignUp} onChange={toggleForm} />
          <span className="login-slider"></span>
          <span className="login-card-side"></span>
          <div className="login-flip-card__inner">
            <div className="login-flip-card__front">
              <div className="login-title">Log in</div>
              <form onSubmit={handleSubmit} className="login-flip-card__form">
                <input type="text" placeholder="Username" name="username" className="login-flip-card__input" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" name="password" className="login-flip-card__input" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="login-flip-card__btn">Let's go!</button>
              </form>
              {errorMessage && <p className="login-error">{errorMessage}</p>}
            </div>

            <div className="login-flip-card__back">
              <div className="login-title">Sign up</div>
              <form onSubmit={handleSubmit} className="login-flip-card__form">
                <input type="text" placeholder="Username" className="login-flip-card__input" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" name="email" className="login-flip-card__input" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" name="password" className="login-flip-card__input" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="login-flip-card__checkbox">
                  <label>
                    <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} /> Admin
                  </label>
                </div>
                <button className="login-flip-card__btn">Confirm!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Login;
