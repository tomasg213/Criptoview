import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { styles } from '../constants/styles';

export default function CryptoModal({ seleccionada, historico, cerrarModal, toggleFavorito, misFavoritos, esMovil }) {
    if (!seleccionada) return null;

    const dynamicModal = {
        ...styles.modal,
        width: esMovil ? '90%' : '640px',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: esMovil ? '24px 16px' : '40px',
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={styles.overlay} onClick={cerrarModal}>
            <div style={dynamicModal} onClick={e => e.stopPropagation()}>

                {/* Header del Modal */}
                <div style={styles.modalHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={seleccionada.image} width="32" height="32" alt={seleccionada.name} style={{ borderRadius: '50%' }} />
                        <h2 style={{ margin: 0, fontSize: esMovil ? '1.25rem' : '1.75rem', fontWeight: '700', color: '#111827' }}>{seleccionada.name}</h2>
                    </div>
                    <button onClick={cerrarModal} style={styles.closeBtn}>&times;</button>
                </div>

                <div style={styles.modalBody}>
                    {/* --- BLOQUE DEL PRECIO DESTACADO --- */}
                    <div style={{ marginBottom: '32px', textAlign: esMovil ? 'center' : 'left' }}>
                        <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Precio Actual</span>
                        <h2 style={{
                            fontSize: esMovil ? '2.5rem' : '3.5rem',
                            margin: '8px 0',
                            fontWeight: '800',
                            color: seleccionada.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444',
                            letterSpacing: '-0.025em'
                        }}>
                            ${seleccionada.current_price.toLocaleString()}
                        </h2>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            backgroundColor: seleccionada.price_change_percentage_24h > 0 ? '#ecfdf5' : '#fef2f2',
                            color: seleccionada.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444',
                            fontSize: '14px',
                            fontWeight: '700'
                        }}>
                            {seleccionada.price_change_percentage_24h > 0 ? '▲' : '▼'}
                            {Math.abs(seleccionada.price_change_percentage_24h).toFixed(2)}% (24h)
                        </div>
                    </div>

                    {/* Gráfica de Recharts */}
                    <div style={{ width: '100%', height: esMovil ? '240px' : '320px', marginBottom: '32px' }}>
                        <ResponsiveContainer>
                            <LineChart data={historico}>
                                <XAxis dataKey="fecha" hide />
                                <YAxis domain={['auto', 'auto']} hide />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ fontWeight: '600' }}
                                    formatter={(value) => [`$${value.toLocaleString()}`, 'Precio']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="precio"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    dot={false}
                                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Botones de Acción */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'center',
                        marginTop: 'auto',
                        flexDirection: esMovil ? 'column' : 'row'
                    }}>
                        <button
                            onClick={() => toggleFavorito(seleccionada.id)}
                            style={{
                                ...styles.favBtn,
                                backgroundColor: misFavoritos.includes(seleccionada.id) ? '#ef4444' : '#6366f1',
                                boxShadow: misFavoritos.includes(seleccionada.id) ? '0 10px 15px -3px rgba(239, 68, 68, 0.3)' : '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
                                width: esMovil ? '100%' : 'auto'
                            }}
                        >
                            {misFavoritos.includes(seleccionada.id) ? '💔 Quitar Favorito' : '⭐ Guardar Favorito'}
                        </button>

                        <a
                            href={`https://www.binance.com/es/trade/${seleccionada.symbol.toUpperCase()}_USDT`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                ...styles.buyBtn,
                                width: esMovil ? '100%' : 'auto',
                                boxShadow: '0 10px 15px -3px rgba(243, 186, 47, 0.3)'
                            }}
                        >
                            Comprar {seleccionada.symbol.toUpperCase()}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
