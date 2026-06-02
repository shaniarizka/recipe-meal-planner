import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      {/* BAGIAN KIRI: Visual Branding (Hanya muncul di Web/Layar Lebar) */}
      <div className="login-visual">
        <div className="visual-content">
          <h1>Plan Your Meals. <br/>Master Your Kitchen.</h1>
          <p>Organize your weekly recipes, discover new flavors, and become the chef you've always wanted to be.</p>
          <div className="visual-badges">
            <span>🍳 Find Recipes</span>
            <span>📅 Weekly Planner</span>
          </div>
        </div>
      </div>

      {/* BAGIAN KANAN: Form Login */}
      <div className="login-form-section">
        <div className="login-box">
          <div className="login-header">
            <span className="brand-tag">RECIPE PLANNER</span>
            <h1>Welcome Back! 👋</h1>
            <p>Please enter your details to continue.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="chef@refimeal.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <div className="label-flex">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot Password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-login-web">
              Login 
            </button>
          </form>

          <div className="web-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-grid">
            <button className="btn-social">Google</button>
            <button className="btn-social">Apple</button>
          </div>

          <p className="footer-note">
            New to the kitchen? <Link to="/register">Register a New Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;