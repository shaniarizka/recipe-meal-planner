import { useAuth } from "../context/AuthContext";

function Profile() {
  const { currentUser } = useAuth();

  return (
    <div className="home-container">
      <div className="profile-card">
        <h1>My Profile</h1>

        <div className="profile-info">
          <p>
            <strong>Name:</strong>{" "}
            {currentUser?.displayName ||
              currentUser?.email?.split("@")[0]}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {currentUser?.email}
          </p>

          <p>
            <strong>User ID:</strong>{" "}
            {currentUser?.uid}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;