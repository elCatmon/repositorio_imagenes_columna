import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar el contexto
import { BASE_URL } from './config';
import Footer from './Footer';
import Header from './Header';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // Estado para el checkbox
    const navigate = useNavigate();
    const { login } = useAuth(); // Obtén la función login del contexto

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
              console.log(data); // Verifica qué datos estás recibiendo
              login(data.user); // Llama a la función login del contexto
              alert('Login exitoso');
              navigate('/menu'); // Redirige después de iniciar sesión
          }
           else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            alert('Hubo un problema con el inicio de sesión. Por favor, intenta nuevamente.');
        }
    };

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked); // Actualiza el estado del checkbox
    };

    return (
        <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
            <Header />

            <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
                <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
                    Iniciar Sesión
                </h1>
                <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize: '20px', fontFamily: 'Poppins' }}>
                    Accede para conocer todas las funcionalidades
                </p>
            </header>

            <main className="max-w-6xl mx-auto py-10">
                <div className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins', width: '60%', marginLeft: '20%' }}>
                    <form onSubmit={handleLogin}>
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input
                                type="email"
                                id="form2Example1"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label className="form-label" htmlFor="form2Example1">Correo electrónico</label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                            <input
                                type="password"
                                id="form2Example2"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="form-label" htmlFor="form2Example2">Contraseña</label>
                        </div>

                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="form2Example31"
                                        checked={rememberMe} // Usar el estado del checkbox
                                        onChange={handleCheckboxChange} // Agregar el manejador onChange
                                    />
                                    <label className="form-check-label" htmlFor="form2Example31"> No cerrar sesión </label>
                                </div>
                            </div>
                            <div className="col">
                                <a href="#!">¿Olvidaste la contraseña?</a>
                            </div>
                        </div>

                        <button type="submit" data-mdb-button-init data-mdb-ripple-init style={{ width: '43%', marginLeft: '31%', backgroundColor: '#666666', color: '#ffffff' }} className="btn btn-block mb-4">Iniciar sesión</button>
                        <div className="text-center">
                            <p>¿No tienes cuenta? <a href="/Register">Registrarse</a></p>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Login;
