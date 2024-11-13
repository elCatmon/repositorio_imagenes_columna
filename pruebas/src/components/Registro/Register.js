import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import Footer from '../assets/Footer';
import Header from '../assets/Header';

function Register() {
  const [name, setName] = useState('');
  const [curp, setCurp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!isValidCURP(curp)) {
      alert('Por favor, ingresa un CURP válido.');
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
          curp: curp,
          correo: email,
          contrasena: password,
        }),
      });

      const text = await response.text();
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(text);
        if (response.ok) {
          alert(data.message);
          navigate('/menu');
        } else {
          alert(data.error || 'Error en la solicitud');
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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidCURP = (curp) => {
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;
    return curpRegex.test(curp);
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
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="text" id="nombre" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            <label className="form-label" htmlFor="nombre">Nombre completo</label>
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="text" id="curp" className="form-control" value={curp} onChange={(e) => setCurp(e.target.value)} required maxLength={18}/>
            <label className="form-label" htmlFor="curp">CURP</label>
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="correo" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label className="form-label" htmlFor="correo">Correo electrónico</label>
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password" id="contrasena" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label className="form-label" htmlFor="contrasena">Contraseña</label>
          </div>
          <button type="submit" style={{ width: '50%', marginLeft: '25%', backgroundColor: '#666666', color: '#ffffff' }} className="btn btn-block mb-4">Registrarse</button>
          <div class="text-center">
              <p>Al crear tu cuenta aceptas que has leído y aceptado nuestros
                <a href="/documentos/TERMINOS_CONDICIONES.pdf" target="_blank" rel="noopener noreferrer" aria-label="Términos y Condiciones">
                  Términos y Condiciones
                </a>
                y has leído nuestro
                <a href="/documentos/AVISO_PRIVACIDAD.pdf" target="_blank" rel="noopener noreferrer" aria-label="Aviso de Privacidad">
                  Aviso de Privacidad
                </a>.
              </p>
            </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
