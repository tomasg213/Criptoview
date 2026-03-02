import CryptoCard from '../Cryptocard.jsx';
import { styles } from '../constants/styles';

export default function CryptoGrid({ criptos, misFavoritos, manejarClickTarjeta, esMovil }) {
    return (
        <div style={styles.grid}>
            {criptos.map((cripto) => (
                <div
                    key={cripto.id}
                    onClick={() => manejarClickTarjeta(cripto)}
                    style={{ width: esMovil ? '100%' : 'auto' }}
                >
                    <CryptoCard
                        nombre={cripto.name}
                        precio={cripto.current_price}
                        imagen={cripto.image}
                        esFavorito={misFavoritos.includes(cripto.id)}
                    />
                </div>
            ))}
        </div>
    );
}
