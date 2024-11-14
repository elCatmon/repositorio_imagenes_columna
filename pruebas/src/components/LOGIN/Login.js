import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar
import { BASE_URL } from '../config/config';
import Footer from '../assets/Footer';
import Header from '../assets/Header';
import './Login.css';
import { useAuth } from '../../AuthContext'; // Importa el contexto de autenticació


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegación
  const { login } = useAuth(); // Usa la función de login del contexto

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
          correo: email,
          contrasena: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login exitoso');

        // Guardar el ID, rol y el timestamp de inicio de sesión
        const currentTime = new Date().getTime(); // Obtiene el tiempo actual en milisegundos
        localStorage.setItem('userID', data.id); // Almacena el ID del usuario
        localStorage.setItem('curp', data.curp);
        localStorage.setItem('role', data.rol); // Almacena el rol del usuario
        localStorage.setItem('loginTime', currentTime); // Almacena el tiempo de inicio de sesión

        // Llama a la función de login del contexto con los parámetros
        login(data.id, data.curp, data.rol);
        navigate('/menu');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert('Hubo un problema con el inicio de sesión. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
      <div className="next-module">
        <Header />
      </div>

      <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
        <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
          Iniciar Sesión
        </h1>
        <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize: '20px', fontFamily: 'Poppins' }}>
          Accede para conocer todas las funcionalidades
        </p>
      </header>

      <main className="max-w-6xl mx-auto py-10">
        {/* Contenedor para la primera fila */}

        <div className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins', width: '80%', marginLeft: '15%' }}>
          <form onSubmit={handleLogin}>
            <div data-mdb-input-init class="form-outline mb-4">
              <input type="email" id="form2Example1" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label class="form-label" for="form2Example1">Correo electrónico</label>
            </div>

            <div data-mdb-input-init class="form-outline mb-4">
              <input type="password" id="form2Example2" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)}
                required />
              <label class="form-label" for="form2Example2">Contraseña</label>
            </div>

            <div class="row mb-4">
              <div class="col d-flex justify-content-center">

                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                  <label class="form-check-label" for="form2Example31"> No cerrar sesión </label>
                </div>
              </div>

              <div class="col">

                <a href="#!">¿Olvidaste la contraseña?</a>
              </div>
            </div>

            <button type="submit" data-mdb-button-init data-mdb-ripple-init style={{ width: '70%', marginLeft: '15%', backgroundColor: '#666666', color: '#ffffff' }} class="btn btn-block mb-4">Iniciar sesión</button>
            <div class="text-center">
              <p>¿No tienes cuenta? <a href="/register" aria-label="Registrarse">Registrarse</a></p>
            </div>
            <div>
              <a href="/documentos/TERMINOS_CONDICIONES.pdf" target="_blank" rel="noopener noreferrer" aria-label="Términos y Condiciones">
                Términos y Condiciones
              </a>
              <br/>
              <a href="/documentos/AVISO_PRIVACIDAD.pdf" target="_blank" rel="noopener noreferrer" aria-label="Aviso de Privacidad">
                Aviso de Privacidad
              </a>
            </div>

          </form>
        </div>


      </main>
      <div className="next-module" />
      <Footer />
    </div>


  );
}

export default Login;
