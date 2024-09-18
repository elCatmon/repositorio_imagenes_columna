import React, { useState } from 'react';
import Section from '../Section';
import MemberModal from '../MemberModal';
import './Nosotros.css';

function Nosotros() {
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className="Nosotros">
      <Section
        title="Nuestro Equipo"
        description="Descubre el talento y la dedicación detrás de nuestro equipo."
        teams={[
          {
            logo: "/imagenes/upp.png",
    name: "Universidad Politécnica de Pachuca",
    members: [
      { name: "Cesar Andrés Ortega Herrera", role: "Estudiante de Ing. de Software", image: "/imagenes/Cesar.jpeg", description: "Descripción del miembro." },
      { name: "Al Dieter Valderrabano Garcia", role: "Estudiante de Biomédica", image: "/imagenes/Al.jpeg", description: "Descripción del miembro." },
      { name: "Julián Garibaldi", role: "Maestro en Ingeniería en Computación", image: "/imagenes/Isai.jpeg", description: "Descripción del miembro." },
    ]
  },

        ]}
        onCardClick={openModal}
      />
      {selectedMember && <MemberModal member={selectedMember} onClose={closeModal} />}
    </div>
  );
}

export default Nosotros;


