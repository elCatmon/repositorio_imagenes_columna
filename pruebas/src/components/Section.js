import React from 'react';
import './Section.css';

function Section({ title, description, teams, onCardClick }) {
  return (
    <div className="section-container">
      <div className="section-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {teams.map((team, index) => (
        <div key={index} className="team-section">
          <div className="team-header">
            <img src={team.logo} alt={team.name} className="team-logo" />
            <h3>{team.name}</h3>
          </div>
          <div className="team-members">
            {team.members.map((member, idx) => (
              <div key={idx} className="card" onClick={() => onCardClick(member)}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '50%', // Ajusta el borde para que sea redondo
                    marginBottom: '10px'
                  }} 
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <button className="btn-primary">Mostrar Información</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Section;

