import React from 'react';
import { BASE_URL } from '../config/config';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import { useAuth } from '../../AuthContext'; // Asegúrate de ajustar la ruta según tu estructura
import { useNavigate } from 'react-router-dom'; // Para redirección

const DatasetDownloader = () => {
    const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación
    const navigate = useNavigate(); // Para redirigir al usuario

    const descargarDataset = () => {
        if (!isAuthenticated) {
            // Si el usuario no está autenticado, redirigir al login
            navigate('/login'); // Ajusta la ruta según sea necesario
            return;
        }

        fetch(`${BASE_URL}/dataset/predeterminado`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Extraer el nombre del archivo de la cabecera Content-Disposition
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'dataset.zip'; // Valor por defecto en caso de que no se encuentre

            if (contentDisposition && contentDisposition.includes('attachment')) {
                const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, ''); // Limpiar las comillas
                }
            }

            return response.blob().then(blob => ({ blob, filename })); // Retornar tanto el blob como el nombre del archivo
        })
        .then(({ blob, filename }) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Establecer el nombre del archivo

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link); // Eliminar el enlace temporal
            window.URL.revokeObjectURL(url); // Liberar el objeto URL
        })
        .catch(error => console.error('Error descargando el dataset:', error));
    };

    return (
        <div>
            <div className="next-module">
                <Header/>
            </div>
            <button onClick={descargarDataset}>Descargar Dataset</button>
            <Footer/>
        </div>
    );
};

export default DatasetDownloader;
