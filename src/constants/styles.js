export const styles = {
    container: { fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh', position: 'relative' },
    header: { textAlign: 'center', marginBottom: '10px' },
    controls: { display: 'flex', justifyContent: 'center', marginBottom: '40px', padding: '0 20px' },
    input: { padding: '12px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    grid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modal: { backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
    modalHeader: { display: 'flex', alignItems: 'center', marginBottom: '10px' },
    closeBtn: { marginLeft: 'auto', background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', padding: '0 5px' },
    modalBody: { textAlign: 'center' },
    buyBtn: { padding: '15px 25px', backgroundColor: '#F3BA2F', color: '#000', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' },
    favBtn: { padding: '15px 25px', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', minWidth: '180px' },
    logoutBtn: { backgroundColor: '#ff4b4b', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }
};
