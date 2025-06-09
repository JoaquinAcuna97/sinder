// src/App.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import ProfileCarousel from './components/ProfileCarousel'; // Import the new carousel component

function App() {
  const [message, setMessage] = useState('Loading...');
  const [title, setTitle] = useState('Loading title...');

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user); // The logged-in user's own data
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setTitle(data.title);
      })
      .catch(() => setMessage('Failed to load message'));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogin(true); // Reset to show login form after logout
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Top section: Always visible */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Hello from React</h1>
        <p className="text-lg">Backend says: {message}</p>
        <p className="text-lg">Title: {title}</p>
      </div>

      {/* Conditional Rendering based on Redux's isLoggedIn state */}
      {isLoggedIn ? (
        // --- SCENARIO 1: User IS logged in ---
        <div className="text-center">
          {user && <p className="text-lg font-medium mb-4">¡Bienvenido, {user.email}!</p>}
          <ProfileCarousel /> {/* Render the Carousel instead of a single profile */}
          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        // --- SCENARIO 2: User IS NOT logged in ---
        <div>
          {showLogin ? (
            <Login onSwitch={() => setShowLogin(false)} />
          ) : (
            <Register onSwitch={() => setShowLogin(true)} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;