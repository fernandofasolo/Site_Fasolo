import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Countdown from '../components/countdown/Countdown'
import ProximosJogos from '../components/jogos/ProximosJogos'
import UltimosResultados from '../components/jogos/UltimosResultados'

// ---------- count-up hook ----------
function useCountUp(target, duration = 1800) {
  const [value, setValue] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return { value, ref }
}

// ---------- StatCard ----------
function StatCard({ icon, target, suffix = '', label }) {
  const { value, ref } = useCountUp(target)
  return (
    <div
      ref={ref}
      className="card flex flex-col items-center py-6 gap-2 hover:border-copa-green/40 transition-colors"
    >
      <span className="text-4xl">{icon}</span>
      <span className="font-display text-5xl text-copa-yellow tracking-wide">
        {value}{suffix}
      </span>
      <span className="text-sm text-gray-400 tracking-widest uppercase">{label}</span>
    </div>
  )
}

// ---------- QuickLink ----------
function QuickLink({ to, icon, label, desc }) {
  return (
    <Link
      to={to}
      className="card group flex items-start gap-4 hover:border-copa-green/50 hover:bg-copa-green/5 transition-all"
    >
      <span className="text-3xl mt-0.5">{icon}</span>
      <div>
        <p className="font-semibold text-white group-hover:text-copa-green transition-colors">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </Link>
  )
}

// ---------- HomePage ----------
export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">

      {/* ── HERO ── */}
      <section className="relative -mx-4 px-4 py-20 overflow-hidden text-center">
        {/* fundo gradiente */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, #002776 0%, #0A0A0A 70%)',
          }}
        />
        {/* linha decorativa copa-green no topo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copa-green via-copa-yellow to-copa-green" />

        {/* troféu */}
        <div className="text-7xl mb-6 select-none">🏆</div>

        {/* título */}
        <h1 className="font-display tracking-widest leading-none mb-2">
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-white">
            COPA DO MUNDO
          </span>
          <span className="block text-6xl sm:text-8xl lg:text-9xl text-copa-yellow">
            2026
          </span>
        </h1>

        {/* tagline */}
        <p className="text-gray-400 tracking-[0.4em] uppercase text-sm sm:text-base mt-4 mb-10">
          We Are 26 &nbsp;&bull;&nbsp; EUA &bull; Canadá &bull; México
        </p>

        {/* countdown */}
        <div className="mb-10">
          <p className="text-xs text-gray-600 tracking-widest uppercase mb-4">
            Abertura &mdash; 11 jun 2026 às 17h (Brasília)
          </p>
          <Countdown />
        </div>

        {/* CTAs */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/tabela" className="btn-primary">
            Ver Tabela de Jogos
          </Link>
          <Link
            to="/bolao"
            className="border border-copa-border text-gray-300 font-bold py-2 px-6 rounded-lg hover:border-copa-gold hover:text-copa-gold transition-colors"
          >
            Montar Bolão
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <section>
        <h2 className="font-display text-2xl tracking-widest text-center text-white mb-6">
          NÚMEROS DA COPA
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="🌍" target={48}  label="Seleções" />
          <StatCard icon="⚽" target={104} label="Jogos" />
          <StatCard icon="🏟️" target={16}  label="Cidades" />
          <StatCard icon="🗺️" target={3}   label="Países-sede" />
        </div>
      </section>

      {/* ── PRÓXIMOS JOGOS ── */}
      <ProximosJogos />

      {/* ── ÚLTIMOS RESULTADOS ── */}
      <UltimosResultados />

      {/* ── ACESSO RÁPIDO ── */}
      <section>
        <h2 className="font-display text-2xl tracking-widest text-white mb-6">
          EXPLORAR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickLink to="/tabela"    icon="📅" label="Tabela de Jogos"        desc="Todos os 104 jogos, filtros por fase, grupo e seleção" />
          <QuickLink to="/grupos"    icon="🏆" label="Grupos e Classificação" desc="12 grupos, tabela atualizada com regras FIFA" />
          <QuickLink to="/elencos"   icon="👕" label="Elencos"                desc="48 seleções e seus jogadores" />
          <QuickLink to="/escalacao" icon="🇧🇷" label="Escalação do Brasil"   desc="Monte sua escalação com drag & drop" />
        </div>
      </section>

    </div>
  )
}
