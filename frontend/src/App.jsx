import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'; // Asegúrate de que este componente exista y sea funcional

function App() {
  const [message, setMessage] = useState('Loading...');
  const [title, setTitle] = useState('Loading title...');

  // Obtenemos el estado de Redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // ESTADO LOCAL PARA ALTERNAR ENTRE FORMULARIOS DE LOGIN Y REGISTER
  // Solo relevante cuando el usuario NO está logueado
  const [showLogin, setShowLogin] = useState(true); 

  useEffect(() => {
    // Fetch inicial del backend
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setTitle(data.title);
      })
      .catch(() => setMessage('Failed to load message'));
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Despachamos la acción de logout
    // Opcional: Al hacer logout, regresamos a la vista de login por defecto
    setShowLogin(true); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }} className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Hello from React</h1>
        <p className="text-lg">Backend says: {message}</p>
        <p className="text-lg">Title: {title}</p>
      </div>

      {isLoggedIn ? (
        // SI EL USUARIO ESTÁ LOGUEADO: Mostrar perfil y botón de logout
        <div className="text-center">
          {user && <p className="text-lg font-medium mb-4">¡Bienvenido, {user.email}!</p>}
          <Profile user={user} />
          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        // SI EL USUARIO NO ESTÁ LOGUEADO: Mostrar un único formulario (Login o Register)
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