import { useState, useEffect } from 'react'
import { apiFetch } from '../utils/api'

export function useJogos(params = {}) {
  const [jogos, setJogos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const key = JSON.stringify(params)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
    ).toString()
    apiFetch(`/api/jogos${query ? '?' + query : ''}`)
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json() })
      .then(data => { setJogos(data); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [key])

  return { jogos, loading, error }
}
