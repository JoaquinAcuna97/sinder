// src/components/Register.jsx
import React from "react";
import { useDispatch } from 'react-redux'; // Importamos useDispatch
import { login } from '../redux/authSlice'; // Importamos la acción 'login' si auto-login tras registro
import AuthForm from "./AuthForm";
import axios from "axios";

export default function Register({ onSwitch }) { // Mantén onSwitch si lo usas para alternar formularios
  const dispatch = useDispatch(); // Obtenemos la función dispatch

  const fields = [
    { label: "Usuario (email)", name: "username", type: "email", autoComplete: "username" },
    { label: "Contraseña", name: "password", type: "password", autoComplete: "new-password" },
    { label: "Teléfono", name: "phone", type: "tel", autoComplete: "tel" },
  ];

  const handleRegister = async (form, setMessage) => {
    setMessage(`Registrando usuario ${form.username} con teléfono ${form.phone}...`);

    try {
      const response = await axios.post("http://localhost:8000/register", {
        email: form.username,
        phone: form.phone,
        password: form.password,
      });

      if (response.status === 200) {
        setMessage("¡Registro exitoso!");
        // Auto-login después de un registro exitoso, actualizando el estado de Redux
        dispatch(login({ user: { email: form.username, id: response.data.user_id } })); // Puedes pasar más datos
      } else {
        setMessage("Error desconocido durante el registro.");
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
      title="Registrarse"
      fields={fields}
      onSubmit={handleRegister}
      toggleText="¿Ya tienes cuenta?"
      onToggle={onSwitch} // Usado para alternar a Login
    />
  );
}