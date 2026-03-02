import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { styles } from '../constants/styles';

export default function CryptoModal({ seleccionada, historico, cerrarModal, toggleFavorito, misFavoritos, esMovil }) {
    if (!seleccionada) return null;

    const dynamicModal = {
        ...styles.modal,
        width: esMovil ? '95%' : '600px',
        padding: esMovil ? '15px' : '30px',
        maxHeight: '90vh',
        overflowY: 'auto'
    };

    return (
        <div style={styles.overlay} onClick={cerrarModal}>
            <div style={dynamicModal} onClick={e => e.stopPropagation()}>

                {/* Header del Modal */}
                <div style={styles.modalHeader}>
                    <img src={seleccionada.image} width="30" alt={seleccionada.name} />
                    <h2 style={{ margin: '0 10px', fontSize: esMovil ? '1.1rem' : '1.5rem' }}>{seleccionada.name}</h2>
                    <button onClick={cerrarModal} style={styles.closeBtn}>×</button>
                </div>

                <div style={styles.modalBody}>
                    {/* --- BLOQUE DEL PRECIO DESTACADO --- */}
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '1rem', color: '#666' }}>Precio Actual:</span>
                        <h2 style={{
                            fontSize: '2.2rem',
                            margin: '5px 0',
                            color: seleccionada.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'
                        }}>
                            ${seleccionada.current_price.toLocaleString()}
                        </h2>
                        <span style={{
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            color: seleccionada.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'
                        }}>
                            {seleccionada.price_change_percentage_24h > 0 ? '▲' : '▼'}
                            {Math.abs(seleccionada.price_change_percentage_24h).toFixed(2)}% (24h)
                        </span>
                    </div>

                    {/* Gráfica de Recharts */}
                    <div style={{ width: '100%', height: esMovil ? '200px' : '300px' }}>
                        <ResponsiveContainer>
                            <LineChart data={historico}>
                                <XAxis dataKey="fecha" hide />
                                <YAxis domain={['auto', 'auto']} hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    formatter={(value) => [`$${value.toLocaleString()}`, 'Precio']}
                                />
                                <Line type="monotone" dataKey="precio" stroke="#6366f1" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Botones de Acción */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => toggleFavorito(seleccionada.id)}
                            style={{
                                ...styles.favBtn,
                                backgroundColor: misFavoritos.includes(seleccionada.id) ? '#ef4444' : '#6366f1'
                            }}
                        >
                            {misFavoritos.includes(seleccionada.id) ? '💔 Quitar Favorito' : '⭐ Guardar Favorito'}
                        </button>

                        <a
                            href={`https://www.binance.com/es/trade/${seleccionada.symbol.toUpperCase()}_USDT`}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.buyBtn}
                        >
                            Comprar {seleccionada.symbol.toUpperCase()}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
