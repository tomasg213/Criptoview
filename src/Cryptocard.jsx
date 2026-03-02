import React from 'react';

const CryptoCard = ({ nombre, precio, imagen }) => {
  const isHighValue = precio > 1000;

  const cardStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    margin: '12px',
    width: '200px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    // Sombra suave para el look moderno
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f0f0f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    textAlign: 'center',
    transition: 'transform 0.2s ease'
  };

  const priceStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    margin: '8px 0 0',
    // Tu lógica original de color
    color: isHighValue ? '#10b981' : '#ef4444', 
  };

  const nameStyle = {
    fontSize: '0.9rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '12px 0 4px'
  };

  return (
    <div style={cardStyle}>
      <img 
        src={imagen} 
        alt={nombre} 
        style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
      />
      <h2 style={nameStyle}>{nombre}</h2>
      <p style={priceStyle}>${precio.toLocaleString()}</p>
    </div>
  );
};

export default CryptoCard;