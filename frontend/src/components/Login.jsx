import React from "react";
import AuthForm from "./AuthForm";
import axios from "axios";

export default function Login({ onSwitch }) {
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
      // Optionally, save token or user info here, e.g.:
      // localStorage.setItem("token", response.data.token);
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
      onToggle={onSwitch}
    />
  );
}
