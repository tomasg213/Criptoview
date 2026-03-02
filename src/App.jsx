import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CryptoGrid from './components/CryptoGrid';
import CryptoModal from './components/CryptoModal';
import { useAuth } from './hooks/useAuth';
import { useFavorites } from './hooks/useFavorites';
import { useCryptoData } from './hooks/useCryptoData';
import { styles } from './constants/styles';

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

  const { session, signOut, signInWithGoogle } = useAuth();
  const { misFavoritos, toggleFavorito } = useFavorites(session);
  const {
    listaCriptos,
    cargando,
    seleccionada,
    historico,
    manejarClickTarjeta,
    cerrarModal
  } = useCryptoData(session);

  useEffect(() => {
    const handleResize = () => setAnchoVentana(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const esMovil = anchoVentana < 768;

  const criptosFiltradas = listaCriptos.filter((cripto) =>
    cripto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#6366f1' }}>Cargando mercado en vivo...</h2>
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, padding: esMovil ? '20px 10px' : '40px 20px' }}>
      <Header
        email={session?.user?.email}
        onSignOut={signOut}
        onSignIn={signInWithGoogle}
        esMovil={esMovil}
      />

      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        esMovil={esMovil}
      />

      <CryptoGrid
        criptos={criptosFiltradas}
        misFavoritos={misFavoritos}
        manejarClickTarjeta={manejarClickTarjeta}
        esMovil={esMovil}
      />

      <CryptoModal
        seleccionada={seleccionada}
        historico={historico}
        cerrarModal={cerrarModal}
        toggleFavorito={toggleFavorito}
        misFavoritos={misFavoritos}
        esMovil={esMovil}
      />
    </div>
  );
}

export default App;