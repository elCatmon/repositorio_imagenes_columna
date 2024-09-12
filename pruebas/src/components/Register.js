import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from './config';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redireccionar

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
          nombre: name,
          correo: email,
          contrasena: password,
        }),
      });
  
      const text = await response.text(); // Obtener el texto de la respuesta para depuración
      const contentType = response.headers.get('Content-Type');
  
      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(text); // Intentar analizar el JSON
        if (response.ok) {
          alert(data.message); // Mostrar mensaje de éxito del backend
        } else {
          alert(data.error || 'Error en la solicitud'); // Mostrar mensaje de error si existe
        }
      } else {
        console.error('Respuesta del servidor no es JSON:', text);
        alert('Respuesta del servidor no es JSON válido.');
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
    <div>
      {/* Botón de regresar */}
      <button onClick={() => navigate('/')}>← Regresar</button>

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
    </div>
  );
}

export default Register;
