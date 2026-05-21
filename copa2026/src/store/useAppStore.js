import { create } from 'zustand'

function getOrCreateSessionId() {
  let id = sessionStorage.getItem('copa_session_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('copa_session_id', id)
  }
  return id
}

const useAppStore = create((set) => ({
  sessionId: getOrCreateSessionId(),

  bolaoAtivo: null,
  setBolaoAtivo: (bolao) => set({ bolaoAtivo: bolao }),

  escalacaoAtiva: null,
  setEscalacaoAtiva: (esc) => set({ escalacaoAtiva: esc }),

  // Toast system
  toasts: [],
  toast(msg, type = 'success') {
    const id = Date.now() + Math.random()
    set(s => ({ toasts: [...s.toasts, { id, msg, type }] }))
    setTimeout(() => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })), 3500)
  },
  dismissToast(id) {
    set(s => ({ toasts: s.toasts.filter(t => t.id !== id) }))
  },
}))

export default useAppStore
