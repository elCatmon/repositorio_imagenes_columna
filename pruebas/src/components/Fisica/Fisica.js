import React from 'react';
import './Fisica.css';
import Footer from '../assets/Footer';
import Header from '../assets/Header';

const Fisica = () => {
  return (
    <div className="bg-gradient-to-r from-teal-100 via-blue-100 to-green-100 min-h-screen">
      <div className="next-module">
        <Header />
      </div>

      <header className="header-section text-center py-12 mt-8" style={{ backgroundColor: 'transparent !important', paddingTop: '10px' }}>
        <h1 className="text-5xl font-extrabold mb-4 animate-reveal" style={{ color: '#666666', backgroundColor: 'transparent !important', marginTop: '20px', fontWeight: '900', fontFamily: 'Poppins' }}>
          Donación física
        </h1>
        <p className="text-xl text-gray-700" style={{ backgroundColor: 'transparent !important', marginTop: '20px', fontSize: '20px', fontFamily: 'Poppins' }}>
          Conoce la dirección de los lugares donde puedes realizar la donación física de documentos.
        </p>
      </header>


      <main className="max-w-6xl mx-auto py-10">
        {/* Contenedor para la primera fila */}
        <div className="grid-cols-3">
          <div className="qr-cardDF">
            <p className=" text-2xl text-gray-600 mt-2 font-semibold ">Universidad Politécnica de Pachuca</p>
            <img src="/imagenes/QR_upp.png" alt="Ubicación" className="qr-imgDF" />
            <p className="text-gray-600 mt-2 font-semibold">Carr. Pachuca - Cd. Sahhagún Km. 20, Ex-Hacienda de Santa Bárbara, Zempoala, Hidalgo, C. P. 43830</p>
            {/*<p className="text-gray-600 mt-2 font-semibold ">Contacto</p>*/}
            <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> ma.cosio.leon@upp.edu.mx</p>
            <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 771 547 75 10</p>
            <p className="text-gray-500 mt-1"><i className="fas fa-globe"></i> <a href="https://www.upp.edu.mx" target="_blank">www.upp.edu.mx</a></p>

          </div>
          <div className="qr-cardDF">
            <p className=" text-2xl text-gray-600 mt-2 font-semibold " style={{ fontSize: '23px' }}>Centro de Investigación y Desarrollo de Tecnología Digital - IPN</p>
            <img src="/imagenes/QR_citedi.png" alt="Ubicación" className="qr-imgDF" />
            <p className="text-gray-600 mt-2 font-semibold">Av. Instituto Politécnico Nacional, #1310, Colonia Nueva Tijuana, Tijuana, Baja California, C. P. 22435</p>
            {/*<p className="text-gray-600 mt-2 font-semibold ">Contacto</p>*/}
            <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> oross@citedi.mx</p>
            <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 664 623 13 44</p>
            <p className="text-gray-500 mt-1"><i className="fas fa-globe"></i> <a href="https://www.citedi.mx" target="_blank">www.citedi.mx</a></p>

          </div>
          <div className="qr-cardDF">
            <p className=" text-2xl text-gray-600 mt-2 font-semibold ">Universidad Autónoma de Baja California</p>
            <img src="/imagenes/QR_uabc.png" alt="Ubicación" className="qr-imgDF" />
            <p className="text-gray-600 mt-2 font-semibold">Av. Alvaro Obregón, Sin número, Colonia Nueva, Mexicali, Baja California, C. P. 21100</p>
            {/*<p className="text-gray-600 mt-2 font-semibold ">Contacto</p>*/}
            <p className="text-gray-500 mt-2"><i className="fas fa-envelope"></i> aviles.gener@uabc.edu.mx</p>
            <p className="text-gray-500 mt-1"><i className="fas fa-phone-alt"></i> +52 686 905 82 57</p>
            <p className="text-gray-500 mt-1"><i className="fas fa-globe"></i> <a href="https://cienciasdelasalud.mxl.uabc.mx" target="_blank">cienciasdelasalud.mxl.uabc.mx</a></p>
          </div>
        </div>


      </main>
      <Footer />
    </div>
  );
}

export default Fisica;
