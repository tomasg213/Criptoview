import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import CryptoCard from './Cryptocard.jsx';

function App() {
  const [listaCriptos, setListaCriptos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [setCargando] = useState(true);
  
  // NUEVOS ESTADOS PARA EL MODAL
  const [seleccionada, setSeleccionada] = useState(null);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const respuesta = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        const datos = await respuesta.json();
        setListaCriptos(datos);
        setCargando(false);
      } catch (error) {
        console.error("Error:", error);
        setCargando(false);
      }
    };
    traerDatos();
  }, );

  // Función para abrir modal y traer histórico
  const manejarClickTarjeta = async (cripto) => {
    setSeleccionada(cripto);
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cripto.id}/market_chart?vs_currency=usd&days=7&interval=daily`);
      const data = await res.json();
      // Formateamos los datos para el gráfico [timestamp, precio] -> {date, price}
      const formateados = data.prices.map(p => ({
        fecha: new Date(p[0]).toLocaleDateString(),
        precio: p[1]
      }));
      setHistorico(formateados);
    } catch (e) {
      console.error("Error historial:", e);
    }
  };

  const cerrarModal = () => {
    setSeleccionada(null);
    setHistorico([]);
  };


  const criptosFiltradas = listaCriptos.filter((cripto) =>
    cripto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CryptoView <span style={{color: '#6366f1'}}>2026</span></h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Buscar moneda..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.grid}>
        {criptosFiltradas.map((cripto) => (
          <div key={cripto.id} onClick={() => manejarClickTarjeta(cripto)} style={{cursor: 'pointer'}}>
            <CryptoCard 
              nombre={cripto.name} 
              precio={cripto.current_price} 
              imagen={cripto.image}
            />
          </div>
        ))}
      </div>

      {/* MODAL MINIMALISTA */}
      {seleccionada && (
        <div style={styles.overlay} onClick={cerrarModal}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <img src={seleccionada.image} width="40" alt={seleccionada.name} />
              <h2 style={{margin: '0 15px'}}>{seleccionada.name} (7d Historial)</h2>
              <button onClick={cerrarModal} style={styles.closeBtn}>×</button>
            </div>

            <div style={styles.modalBody}>
              <div style={{width: '100%', height: '300px'}}>
                <ResponsiveContainer>
                  <LineChart data={historico}>
                    <XAxis dataKey="fecha" hide />
                    <YAxis domain={['auto', 'auto']} hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="precio" stroke="#6366f1" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <a 
                href={`https://www.binance.com/es/trade/${seleccionada.symbol.toUpperCase()}_USDT`} 
                target="_blank" 
                rel="noreferrer"
                style={styles.buyBtn}
              >
                Comprar {seleccionada.symbol.toUpperCase()} en Binance
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos modernos para el Modal
const styles = {
  container: { padding: '40px 20px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' },
  header: { textAlign: 'center', marginBottom: '30px' },
  controls: { display: 'flex', justifyContent: 'center', marginBottom: '40px' },
  input: { padding: '12px', borderRadius: '12px', border: '1px solid #ddd', width: '300px' },
  grid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' },
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: 'white', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '600px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', alignItems: 'center', marginBottom: '20px' },
  closeBtn: { marginLeft: 'auto', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' },
  modalBody: { textAlign: 'center' },
  buyBtn: { display: 'inline-block', marginTop: '20px', padding: '15px 30px', backgroundColor: '#F3BA2F', color: '#000', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', transition: 'transform 0.2s' }
};

export default App;