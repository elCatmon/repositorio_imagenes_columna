import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from '../config/config';
import Footer from '../assets/Footer';
import Header from '../assets/Header';

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
          alert(data.message); // Mostrar mensaje de éxito del 
          navigate('/menu')
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
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
      <div className="next-module">
        <Header />
      </div>

      <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
        <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
          Registrarse
        </h1>
        <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize: '20px', fontFamily: 'Poppins' }}>
          Introduce tus datos para registrarte
        </p>
      </header>

      <div className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', fontWeight: '900', fontFamily: 'Poppins', width: '80%', marginLeft: '0%' }}>

        <form onSubmit={handleRegister}>

          <div data-mdb-input-init class="form-outline mb-4">
            <input type="text" id="form2Example1" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            <label class="form-label" for="form2Example1">Nombre completo</label>
          </div>
          <div data-mdb-input-init class="form-outline mb-4">
            <input type="email" id="form2Example2" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label className="form-label" for="form2Example1">Correo electrónico</label>
          </div>
          <div data-mdb-input-init class="form-outline mb-4">
            <input type="password" id="form2Example3" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label className="form-label" for="form2Example1">Contraseña</label>
          </div>
          <button type="submit" data-mdb-button-init data-mdb-ripple-init style={{ width: '50%', marginLeft: '25%', backgroundColor: '#666666', color: '#ffffff' }} className="btn btn-block mb-4">Registrarse</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
