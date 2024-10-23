import React from 'react';
import { BASE_URL } from '../config/config';

const DatasetDownloader = () => {
    const descargarDataset = () => {
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
            <button onClick={descargarDataset}>Descargar Dataset</button>
        </div>
    );
};

export default DatasetDownloader;