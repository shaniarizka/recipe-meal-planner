import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Register Success");
      navigate("/login");
    } catch (error) {
      alert(error.code);
    }
  };

  return (
    <div className="register-wrapper">
      {/* SISI KIRI: Visual Branding */}
      <div className="register-visual">
        <div className="visual-content">
          <h1>Join the Community of Chefs.</h1>
          <p>Create your account to start planning your meals, saving your favorite recipes, and sharing your culinary journey.</p>
          <div className="visual-features">
            <div className="feature-item">✓ Personal Meal Calendar</div>
            <div className="feature-item">✓ Save Unlimited Recipes</div>
            <div className="feature-item">✓ Community Access</div>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Form Register */}
      <div className="register-form-section">
        <div className="register-box">
          <div className="register-header">
            <span className="brand-tag">RECIPE PLANNER</span>
            <h1>Create Account ✨</h1>
            <p>Join us and start your healthy lifestyle today.</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="input-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Chef Juna"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="chef@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-register-web">
              Start Cooking Now
            </button>
          </form>

          <p className="footer-note">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;