import { useState, useEffect } from 'react'
import { apiFetch } from '../utils/api'

export function useGrupos() {
  const [grupos, setGrupos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/api/grupos')
      .then(r => r.json())
      .then(data => { setGrupos(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return { grupos, loading }
}
