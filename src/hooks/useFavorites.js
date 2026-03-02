import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useFavorites(session) {
    const [misFavoritos, setMisFavoritos] = useState([]);

    useEffect(() => {
        const cargarFavoritos = async () => {
            if (!session) {
                setMisFavoritos([]);
                return;
            }
            const { data, error } = await supabase
                .from('favoritos')
                .select('coin_id')
                .eq('user_id', session.user.id);

            if (!error && data) {
                setMisFavoritos(data.map(f => f.coin_id));
            }
        };
        cargarFavoritos();
    }, [session]);

    const toggleFavorito = async (coinId) => {
        if (!session) {
            alert("Inicia sesión para guardar favoritos");
            return;
        }

        const { data: existente } = await supabase
            .from('favoritos')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('coin_id', coinId)
            .single();

        if (existente) {
            await supabase.from('favoritos').delete().eq('id', existente.id);
            setMisFavoritos(misFavoritos.filter(id => id !== coinId));
        } else {
            const { error } = await supabase
                .from('favoritos')
                .insert([{ user_id: session.user.id, coin_id: coinId }]);

            if (!error) setMisFavoritos([...misFavoritos, coinId]);
        }
    };

    return { misFavoritos, toggleFavorito };
}
