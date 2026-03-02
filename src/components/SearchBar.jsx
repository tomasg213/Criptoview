import { styles } from '../constants/styles';

export default function SearchBar({ busqueda, setBusqueda, esMovil }) {
    const dynamicInput = {
        ...styles.input,
        width: esMovil ? '100%' : '400px',
        fontSize: '16px'
    };

    return (
        <div style={styles.controls}>
            <input
                type="text"
                placeholder="Buscar moneda..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={dynamicInput}
            />
        </div>
    );
}
