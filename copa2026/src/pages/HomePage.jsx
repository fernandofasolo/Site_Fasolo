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
      <section className="relative -mx-4 px-4 py-24 overflow-hidden text-center">
        {/* imagem de fundo oficial FIFA */}
        <img
          src="/copa2026/hero-fifa-2026.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 select-none pointer-events-none"
        />
        {/* overlay escuro com gradiente para fundir com o fundo da página */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(10,10,10,0.75) 70%, #0A0A0A 100%)',
          }}
        />
        {/* linha decorativa no topo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copa-green via-copa-yellow to-copa-green" />

        {/* slogan principal */}
        <h1 className="font-display tracking-widest leading-none mb-4">
          <span className="block text-6xl sm:text-8xl lg:text-9xl text-white drop-shadow-lg">
            WE ARE
          </span>
          <span className="block text-8xl sm:text-[10rem] lg:text-[12rem] text-copa-yellow drop-shadow-lg">
            26
          </span>
        </h1>

        {/* sedes */}
        <p className="text-gray-300 tracking-[0.35em] uppercase text-sm sm:text-base mb-10">
          EUA &bull; Canadá &bull; México
        </p>

        {/* countdown */}
        <div className="mb-10">
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-4">
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
