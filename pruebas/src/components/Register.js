import React, { useState } from 'react';
import { BASE_URL } from './config';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el registro
  const handleRegister = async (event) => {
    event.preventDefault(); // Prevenir la recarga de la página

    // Validar el correo electrónico
    if (!isValidEmail(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: name,     // Cambiado de 'username' a 'nombre'
          correo: email,    // Cambiado de 'email' a 'correo'
          contrasena: password,  // Cambiado de 'password' a 'contrasena'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Mostrar mensaje de éxito del backend
      } else {
        const errorData = await response.json(); // Manejar la respuesta de error
        alert(errorData.error || 'Error en la solicitud'); // Mostrar mensaje de error si existe
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un problema con el registro. Por favor, intenta nuevamente.');
    }
  };

  // Función para validar el formato del correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
