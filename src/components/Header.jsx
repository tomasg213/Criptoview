import { styles } from '../constants/styles';

export default function Header({ email, onSignOut, onOpenLogin, esMovil }) {
    const dynamicHeader = {
        ...styles.header,
        fontSize: esMovil ? '1.8rem' : '3rem',
        fontWeight: '800',
        letterSpacing: '-0.025em',
        color: '#111827'
    };

    return (
        <div style={{ padding: esMovil ? '10px 0 30px' : '40px 0', position: 'relative' }}>
            <div style={{
                position: esMovil ? 'static' : 'absolute',
                top: 10,
                right: 10,
                display: 'flex',
                justifyContent: esMovil ? 'center' : 'flex-end',
                marginBottom: esMovil ? '24px' : '0',
                zIndex: 10
            }}>
                {email ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '6px 12px', borderRadius: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        {!esMovil && <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: '500' }}>{email}</span>}
                        <button onClick={onSignOut} style={styles.logoutBtn}>Cerrar Sesión</button>
                    </div>
                ) : (
                    <button
                        onClick={onOpenLogin}
                        style={{
                            ...styles.logoutBtn,
                            backgroundColor: '#6366f1',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '14px',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>👤</span>
                        Iniciar Sesión
                    </button>
                )}
            </div>
            <h1 style={dynamicHeader}>CryptoView <span style={{ color: '#6366f1' }}>2026</span></h1>
            {email && <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '15px', marginTop: '-8px', fontWeight: '500' }}>Panel de Control</p>}
        </div>
    );
}
