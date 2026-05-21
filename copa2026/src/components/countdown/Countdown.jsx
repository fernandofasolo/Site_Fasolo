import { useState, useEffect } from 'react'

// 11/06/2026 17h00 Brasília = 20h00 UTC
const TARGET = new Date('2026-06-11T20:00:00Z')

function calcular() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return null
  return {
    dias:     Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:    Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos:  Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

function Bloco({ valor, label }) {
  return (
    <div className="flex flex-col items-center bg-black/40 border border-copa-border rounded-2xl px-5 py-4 min-w-[80px] backdrop-blur-sm">
      <span className="font-mono text-5xl sm:text-6xl font-bold text-copa-yellow tabular-nums leading-none">
        {String(valor).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-gray-500 tracking-[0.25em] mt-2 uppercase">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const [tempo, setTempo] = useState(calcular)

  useEffect(() => {
    const id = setInterval(() => setTempo(calcular()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!tempo) {
    return (
      <p className="font-display text-4xl text-copa-green tracking-widest animate-pulse">
        A COPA COMEÇOU!
      </p>
    )
  }

  return (
    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
      <Bloco valor={tempo.dias}     label="dias" />
      <Bloco valor={tempo.horas}    label="horas" />
      <Bloco valor={tempo.minutos}  label="min" />
      <Bloco valor={tempo.segundos} label="seg" />
    </div>
  )
}
