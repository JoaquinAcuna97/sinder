import React from "react";
import AuthForm from "./AuthForm";
import axios from "axios";

export default function Register({ onSwitch }) {
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
      onToggle={onSwitch}
    />
  );
}
