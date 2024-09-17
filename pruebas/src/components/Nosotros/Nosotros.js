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
      { name: "Gabriela Lizeth Rodríguez Cortés", role: "Maestra en T.I.C.", image: "/imagenes/Gabriela.jpeg", description: "Descripción del miembro." },
      { name: "Cesar Andrés Ortega Herrera", role: "Estudiante de Ing. de Software", image: "/imagenes/Cesar.jpeg", description: "Descripción del miembro." },
      { name: "Juan Carlos Martínez Labra", role: "Estudiante de Ing. de Software", image: "/imagenes/Juan.jpeg", description: "Descripción del miembro." },
      { name: "Israel Espinosa López", role: "Estudiante de Ing. de Software", image: "/imagenes/Israel.jpeg", description: "Descripción del miembro." },
      { name: "Al Dieter Valderrabano Garcia", role: "Estudiante de Biomédica", image: "/imagenes/Al.jpeg", description: "Descripción del miembro." },
      { name: "Isaí Sánchez Rosas", role: "Estudiante de Ing. de Software", image: "/imagenes/Isai.jpeg", description: "Descripción del miembro." },
      { name: "Dali Escalante Urdanivia", role: "Estudiante de Ing. de Software", image: "/imagenes/Dali.jpeg", description: "Descripción del miembro." },
      { name: "Cristian Leonel Islas Aguilan", role: "Estudiante de Ing. de Software", image: "/imagenes/Cristian.jpeg", description: "Descripción del miembro." },
    ]
  },
  {
    logo: "/imagenes/logo_citedi.png",
    name: "Instituto Tecnológico de Agua Prieta",
    members: [
      { name: "Alma Danisa Romero Ocaño", role: "Doctora en Ciencias", image: "/imagenes/Alma.jpeg", description: "Descripción del miembro." },
      { name: "Víctor Manuel Valenzuela Alcaraz", role: "Doctor en Ciencias e Ingeniería", image: "/imagenes/Victor.jpeg", description: "Descripción del miembro." },
      { name: "Danisa Victoria Valenzuela Romero", role: "Estudiante de Medicina", image: "/imagenes/Danisa.jpeg", description: "Descripción del miembro." },
    ]
  },
  {
    logo: "/imagenes/itt_logo.png",
    name: "Universidad Autónoma de Baja California",
    members: [
      { name: "Laura Johana González Zazueta", role: "Bioingeniera", image: "/imagenes/Laura.jpeg", description: "Descripción del miembro." },
      { name: "Betsaida Lariza López Covarrubias", role: "Bioingeniera", image: "/imagenes/Betsaida.jpeg", description: "Descripción del miembro." },
    ]
  },
  {
    logo: "/imagenes/cedetfa_logo.png",
    name: "Centro de Investigación y Desarrollo Tecnológico de la F.A",
    members: [
      { name: "Marco Leonardo Lecona Guzmán", role: "Subteniente", image: "/imagenes/Marco.jpeg", description: "Oficial de la Fuerza Aérea Mexicana..." },
    ]
          }
        ]}
        onCardClick={openModal}
      />
      {selectedMember && <MemberModal member={selectedMember} onClose={closeModal} />}
    </div>
  );
}

export default Nosotros;


