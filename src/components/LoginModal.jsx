import { useState } from 'react';
import { styles } from '../constants/styles';

export default function LoginModal({ isOpen, onClose, onSignIn }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await onSignIn(email);
            setSent(true);
        } catch (err) {
            setError(err.message || 'Error al enviar el enlace');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div
                style={{
                    ...styles.modal,
                    width: '90%',
                    maxWidth: '400px',
                    padding: '40px 30px',
                    textAlign: 'center'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} style={styles.closeBtn}>&times;</button>

                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px', color: '#111827' }}>
                    Bienvenido
                </h2>

                {!sent ? (
                    <>
                        <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '14px' }}>
                            Ingresa tu correo para recibir un enlace de acceso mágico.
                        </p>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    ...styles.input,
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    textAlign: 'center'
                                }}
                            />
                            {error && <p style={{ color: '#ef4444', fontSize: '12px', margin: 0 }}>{error}</p>}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    ...styles.favBtn,
                                    width: '100%',
                                    backgroundColor: '#6366f1',
                                    marginTop: '10px'
                                }}
                            >
                                {loading ? 'Enviando...' : 'Enviar enlace mágico'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ padding: '20px 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📩</div>
                        <h3 style={{ color: '#10b981', marginBottom: '10px' }}>¡Enlace enviado!</h3>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>
                            Revisa tu bandeja de entrada (y la carpeta de spam) para iniciar sesión.
                        </p>
                        <button
                            onClick={onClose}
                            style={{
                                ...styles.logoutBtn,
                                marginTop: '30px',
                                padding: '12px 24px',
                                background: '#f3f4f6',
                                color: '#4b5563'
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
