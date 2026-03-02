import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Enviamos un enlace mágico al correo
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.message)
    } else {
      alert('¡Revisa tu correo para el enlace de inicio de sesión!')
    }
    setLoading(false)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a CriptoView Pro</h1>
      <p>Inicia sesión para guardar tus favoritas en la nube</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button disabled={loading} style={{ marginLeft: '10px', padding: '10px 20px' }}>
          {loading ? 'Cargando...' : 'Enviar enlace mágico'}
        </button>
      </form>
    </div>
  )
}