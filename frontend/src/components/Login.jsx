// src/components/Login.jsx
import React from "react";
import { useDispatch } from 'react-redux'; // Importamos useDispatch
import { login } from '../redux/authSlice'; // Importamos la acción 'login'
import AuthForm from "./AuthForm";
import axios from "axios";

export default function Login({ onSwitch }) { // Mantén onSwitch si lo usas para alternar formularios
  const dispatch = useDispatch(); // Obtenemos la función dispatch

  const fields = [
    { label: "Usuario (email)", name: "username", type: "email", autoComplete: "username" },
    { label: "Contraseña", name: "password", type: "password", autoComplete: "current-password" },
  ];

  const handleLogin = async (form, setMessage) => {
    setMessage(`Iniciando sesión con ${form.username}...`);

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: form.username,
        password: form.password,
      });

      if (response.status === 200) {
        setMessage("Login exitoso!");
        // Aquí es donde actualizamos el estado de Redux
        dispatch(login({ user: { email: form.username, id: response.data.user_id } })); // Ejemplo: puedes pasar más datos del usuario desde la respuesta del backend
      } else {
        setMessage("Error desconocido durante el login.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        setMessage(`Error: ${error.response.data.detail}`);
      } else {
        setMessage("Error de red o del servidor.");
      }
    }
  };

  return (
    <AuthForm
      title="Iniciar Sesión"
      fields={fields}
      onSubmit={handleLogin}
      toggleText="¿No tienes cuenta?"
      onToggle={onSwitch} // Usado para alternar a Register
    />
  );
}