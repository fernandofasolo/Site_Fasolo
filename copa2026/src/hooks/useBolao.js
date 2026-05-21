import { useState, useEffect } from 'react'
import { apiFetch } from '../utils/api'
import useAppStore from '../store/useAppStore'

export function useBolao(bolaoId) {
  const sessionId = useAppStore(s => s.sessionId)
  const [palpites, setPalpites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bolaoId) { setLoading(false); return }
    apiFetch(`/api/boloes/${bolaoId}/palpites`, {
      headers: { 'X-Session-Id': sessionId },
    })
      .then(r => r.json())
      .then(data => { setPalpites(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [bolaoId, sessionId])

  return { palpites, loading }
}
