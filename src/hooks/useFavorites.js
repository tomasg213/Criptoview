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
            alert("Inicia sesión con tu correo para guardar tus favoritas.");
            return;
        }

        try {
            const { data: existente, error: fetchError } = await supabase
                .from('favoritos')
                .select('*')
                .eq('user_id', session.user.id)
                .eq('coin_id', coinId)
                .maybeSingle();

            if (fetchError) throw fetchError;

            if (existente) {
                const { error: deleteError } = await supabase
                    .from('favoritos')
                    .delete()
                    .eq('id', existente.id);

                if (deleteError) throw deleteError;
                setMisFavoritos(misFavoritos.filter(id => id !== coinId));
            } else {
                const { error: insertError } = await supabase
                    .from('favoritos')
                    .insert([{ user_id: session.user.id, coin_id: coinId }]);

                if (insertError) throw insertError;
                setMisFavoritos([...misFavoritos, coinId]);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error.message);
            alert("Hubo un error al guardar tu favorito. Verifica tu conexión.");
        }
    };

    return { misFavoritos, toggleFavorito };
}
