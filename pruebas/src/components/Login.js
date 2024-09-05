import React, { useState } from 'react';
import { BASE_URL } from './config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,     // Asegúrate de que esto coincida con el nombre del campo en el backend
          contrasena: password,  // Asegúrate de que esto coincida con el nombre del campo en el backend
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login exitoso');
        console.log('Datos del login:', data);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un problema con el inicio de sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default Login;
