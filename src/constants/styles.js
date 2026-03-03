export const styles = {
    container: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#f4f7f6',
        minHeight: '100vh',
        position: 'relative',
        boxSizing: 'border-box'
    },
    header: { textAlign: 'center', marginBottom: '10px', padding: '0 10px' },
    controls: { display: 'flex', justifyContent: 'center', marginBottom: '30px', padding: '0 20px' },
    input: {
        padding: '12px 16px',
        borderRadius: '14px',
        border: '1px solid #e5e7eb',
        outline: 'none',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        transition: 'all 0.2s'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px',
        padding: '0 10px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
    modal: { backgroundColor: 'white', borderRadius: '28px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', position: 'relative' },
    modalHeader: { display: 'flex', alignItems: 'center', marginBottom: '15px' },
    closeBtn: { marginLeft: 'auto', background: '#f3f4f6', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '5px 12px', borderRadius: '12px', color: '#6b7280' },
    modalBody: { textAlign: 'center' },
    buyBtn: { padding: '14px 24px', backgroundColor: '#F3BA2F', color: '#000', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' },
    favBtn: { padding: '14px 24px', color: '#fff', borderRadius: '14px', border: 'none', fontWeight: 'bold', cursor: 'pointer', minWidth: '160px' },
    logoutBtn: { backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }
};
