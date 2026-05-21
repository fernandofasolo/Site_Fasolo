import { useEffect } from 'react'
import useAppStore from '../../store/useAppStore'

const ICON = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
}

const COLOR = {
  success: 'border-copa-green bg-copa-green/10 text-copa-green',
  error:   'border-red-600   bg-red-900/20   text-red-400',
  info:    'border-copa-blue bg-copa-blue/20  text-blue-300',
}

function Toast({ toast }) {
  const dismiss = useAppStore(s => s.dismissToast)

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-xl border shadow-xl
        animate-slide-in max-w-sm w-full
        ${COLOR[toast.type] ?? COLOR.info}
      `}
    >
      <span className="text-sm font-bold shrink-0 mt-px">{ICON[toast.type] ?? 'ℹ'}</span>
      <span className="text-sm flex-1 text-gray-200">{toast.msg}</span>
      <button
        onClick={() => dismiss(toast.id)}
        className="text-gray-600 hover:text-white text-xs shrink-0"
      >
        ✕
      </button>
    </div>
  )
}

export default function Toaster() {
  const toasts = useAppStore(s => s.toasts)

  return (
    <div className="fixed bottom-6 right-4 z-[100] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <Toast toast={t} />
        </div>
      ))}
    </div>
  )
}
