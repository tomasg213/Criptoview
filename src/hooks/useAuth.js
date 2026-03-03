import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useAuth() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = () => supabase.auth.signOut();

    const signInWithEmail = async (email) => {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            }
        });
        if (error) throw error;
    };

    return { session, signOut, signInWithEmail };
}
