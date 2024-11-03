import React, { useState } from 'react';
import axios from 'axios';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import { BASE_URL } from '../config/config';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1 = Verificar Correo, 2 = Cambiar Contraseña
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            // Llama al servicio para verificar si el correo existe
            const response = await axios.post(`${BASE_URL}/verificarcorreo`, { email });
            if (response.data.exists) {
                setStep(2); // Cambiar a la segunda etapa si el correo existe
            } else {
                setError('No se encontró ninguna cuenta con ese correo.');
            }
        } catch (err) {
            setError('Error al verificar el correo.');
        }
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Llama al servicio para cambiar la contraseña
            const response = await axios.post(`${BASE_URL}/cambiocontrasena`, {
                email,
                currentPassword,
                newPassword
            });
            if (response.status === 200) {
                setSuccess('Contraseña cambiada con éxito.');
                // Aquí podrías redirigir o reiniciar el formulario
                
            } else {
                setError('Error al cambiar la contraseña. Asegúrate de que la contraseña actual sea correcta.');
            }
        } catch (err) {
            setError('Error al cambiar la contraseña.');
        }
    };

    return (
        <div>
       <div className="next-module">
        <Header/>
        <div className="next-module"/>
        </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            {step === 1 ? (
                <form onSubmit={handleEmailSubmit}>
                    <label>
                        Ingresa tu correo:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Verificar Correo</button>
                </form>
            ) : (
                <form onSubmit={handleChangePasswordSubmit}>
                    <label>
                        Contraseña actual:
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Nueva contraseña:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirmar nueva contraseña:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Cambiar Contraseña</button>
                </form>
            )}
            <div className="next-module"/>
            <Footer/>
        </div>
    );
};

export default ChangePassword;
