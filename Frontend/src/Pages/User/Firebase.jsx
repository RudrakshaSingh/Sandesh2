import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbfISvxEUFihIFThr8YXBvE9hDAKm0-7c",
  authDomain: "sandesh-c9900.firebaseapp.com",
  projectId: "sandesh-c9900",
  storageBucket: "sandesh-c9900.firebasestorage.app",
  messagingSenderId: "498733744341",
  appId: "1:498733744341:web:b59922172d898c991d625c",
  measurementId: "G-VJGPHBEZXB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function GoogleLoginForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      // Sign in with Google popup
      await signInWithPopup(auth, googleProvider);
      // User state will be updated by the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // User state will be updated by the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Firebase Authentication</h2>

      {error && <div className="error-message">{error}</div>}

      {user ? (
        <div className="profile-container">
          <div className="profile-header">
            <h3>Welcome!</h3>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="profile-image"
              />
            )}
          </div>

          <div className="profile-details">
            <p>
              <strong>Display Name:</strong> {user.displayName || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>User ID:</strong> {user.uid}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="sign-out-button"
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Out"}
          </button>
        </div>
      ) : (
        <div className="login-container">
          <p>Sign in to your account using Google:</p>

          <button
            onClick={handleGoogleSignIn}
            className="google-sign-in-button"
            disabled={loading}
          >
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            {loading ? "Processing..." : "Sign in with Google"}
          </button>
        </div>
      )}

      <style jsx>{`
        .auth-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .error-message {
          color: #d32f2f;
          background-color: #fff8f8;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 4px solid #d32f2f;
        }

        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
        }

        .google-sign-in-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background-color: white;
          color: #444;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          font-weight: bold;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: background-color 0.3s, box-shadow 0.3s;
        }

        .google-sign-in-button:hover {
          background-color: #f8f8f8;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
        }

        .google-sign-in-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .google-sign-in-button svg {
          margin-right: 10px;
        }

        .profile-container {
          padding: 20px 0;
        }

        .profile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .profile-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #4285f4;
        }

        .profile-details {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .profile-details p {
          margin: 8px 0;
        }

        .sign-out-button {
          width: 100%;
          padding: 10px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .sign-out-button:hover {
          background-color: #d32f2f;
        }

        .sign-out-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default GoogleLoginForm;
