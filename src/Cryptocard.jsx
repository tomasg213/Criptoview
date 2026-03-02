function CryptoCard({ nombre, precio, imagen, esFavorito }) {
  // Lógica para el color del precio (puedes mantener la tuya o usar esta)
  const esCaro = precio > 1000;

  return (
    <div style={cardStyles.container}>
      {/* 🌟 LA ESTRELLA DE FAVORITO */}
      {esFavorito && (
        <div style={cardStyles.starBadge}>
          ⭐
        </div>
      )}

      <div style={cardStyles.header}>
        <img src={imagen} alt={nombre} style={cardStyles.icon} />
        <h3 style={cardStyles.title}>{nombre}</h3>
      </div>
      
      <p style={{ 
        ...cardStyles.price, 
        color: esCaro ? '#10b981' : '#ef4444' 
      }}>
        ${precio.toLocaleString()}
      </p>
    </div>
  );
}

const cardStyles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    width: '200px',
    position: 'relative', // Necesario para posicionar la estrella
    cursor: 'pointer',
    transition: 'transform 0.2s',
    border: '1px solid #e5e7eb'
  },
  starBadge: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    fontSize: '14px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  icon: {
    width: '45px',
    height: '45px'
  },
  title: {
    margin: 0,
    fontSize: '1rem',
    color: '#374151'
  },
  price: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginTop: '15px'
  }
};

export default CryptoCard;