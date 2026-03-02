import { useState, useEffect } from 'react';

export function useCryptoData(session) {
    const [listaCriptos, setListaCriptos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [seleccionada, setSeleccionada] = useState(null);
    const [historico, setHistorico] = useState([]);

    // Traer datos reales de CoinGecko
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
                console.error("Error trayendo criptos:", error);
            } finally {
                setCargando(false);
            }
        };
        traerDatos();
    }, []);

    const manejarClickTarjeta = async (cripto) => {
        setSeleccionada(cripto);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cripto.id}/market_chart?vs_currency=usd&days=7&interval=daily`);
            const data = await res.json();
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

    return {
        listaCriptos,
        cargando,
        seleccionada,
        historico,
        manejarClickTarjeta,
        cerrarModal
    };
}
