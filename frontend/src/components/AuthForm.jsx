import React, { useState } from "react";

export default function AuthForm({ title, fields, onSubmit, toggleText, onToggle }) {
  const [form, setForm] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyField = fields.find((f) => !form[f.name]);
    if (emptyField) {
      setMessage(`Por favor completa el campo: ${emptyField.label}`);
      return;
    }
    setMessage("");
    onSubmit(form, setMessage);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ label, name, type, autoComplete }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={label}
            value={form[name]}
            onChange={handleChange}
            autoComplete={autoComplete}
            className="w-full border px-3 py-2 rounded"
          />
        ))}
        <button
          type="submit"
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded cursor-pointer transition-colors duration-300 !bg-blue-500"
        >
          {title}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-gray-700">{message}</p>
      )}
      <p className="mt-6 text-center text-sm">
        {toggleText}{" "}
        <button
          className="text-blue-600 hover:underline"
          onClick={onToggle}
        >
          {toggleText === "¿No tienes cuenta?" ? "Regístrate aquí" : "Inicia sesión aquí"}
        </button>
      </p>
    </div>
  );
}
