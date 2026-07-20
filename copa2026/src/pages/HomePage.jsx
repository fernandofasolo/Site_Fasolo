import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UltimosResultados from '../components/jogos/UltimosResultados'
import Bandeira from '../components/ui/Bandeira'

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

// ---------- StatCard (número animado) ----------
function StatCard({ icon, target, prefix = '', suffix = '', label }) {
  const { value, ref } = useCountUp(target)
  return (
    <div
      ref={ref}
      className="card flex flex-col items-center py-6 gap-2 text-center hover:border-copa-green/40 transition-colors"
    >
      <span className="text-4xl">{icon}</span>
      <span className="font-display text-4xl sm:text-5xl text-copa-yellow tracking-wide">
        {prefix}{value.toLocaleString('pt-BR')}{suffix}
      </span>
      <span className="text-sm text-gray-400 tracking-widest uppercase">{label}</span>
    </div>
  )
}

// ---------- InfoCard (valor em texto: nomes, %, etc.) ----------
function InfoCard({ icon, value, sub, label }) {
  return (
    <div className="card flex flex-col items-center py-6 gap-1.5 text-center hover:border-copa-green/40 transition-colors">
      <span className="text-4xl">{icon}</span>
      <span className="font-display text-2xl sm:text-3xl text-copa-yellow tracking-wide leading-tight">
        {value}
      </span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
      <span className="text-xs text-gray-500 tracking-widest uppercase mt-1">{label}</span>
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
      <section className="relative -mx-4 overflow-hidden text-center">
        {/* camada de fundo: imagem + overlay */}
        <div className="absolute inset-0">
          <img
            src="/copa2026/hero-fifa-2026.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(10,10,10,0.88) 70%, #0A0A0A 100%)',
            }}
          />
        </div>

        {/* linha decorativa no topo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copa-green via-copa-yellow to-copa-green z-10" />

        {/* conteúdo sobre o fundo */}
        <div className="relative z-10 px-4 py-24">
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

          {/* torneio encerrado — campeã */}
          <div className="mb-10 flex flex-col items-center gap-3">
            <span className="text-xs text-gray-400 tracking-[0.25em] uppercase">
              Torneio encerrado &mdash; 19 jul 2026
            </span>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-copa-gold/50 bg-copa-gold/10 px-5 sm:px-7 py-4 backdrop-blur-sm">
              <span className="text-3xl sm:text-4xl">🏆</span>
              <Bandeira iso="ES" className="h-8 sm:h-9 w-auto rounded shadow" />
              <div className="text-left">
                <p className="font-display text-xl sm:text-3xl text-copa-gold tracking-wide leading-none">
                  ESPANHA CAMPEÃ
                </p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1.5">
                  Espanha <b className="text-white">1&ndash;0</b> Argentina{' '}
                  <span className="text-gray-500">(a.e.t.)</span>
                  <span className="hidden sm:inline"> &middot; Ferran Torres 106&apos;</span>
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              2º título mundial da Espanha &middot; MetLife Stadium
            </p>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/tabela" className="btn-primary">
              Ver Todos os Resultados
            </Link>
            <Link
              to="/grupos"
              className="border border-copa-border text-gray-300 font-bold py-2 px-6 rounded-lg hover:border-copa-gold hover:text-copa-gold transition-colors"
            >
              Classificação Final
            </Link>
          </div>
        </div>
      </section>

      {/* ── NÚMEROS DA COPA ── */}
      <section className="space-y-10">
        <div>
          <h2 className="font-display text-2xl tracking-widest text-center text-white mb-6">
            NÚMEROS DA COPA
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="🌍" target={48}  label="Seleções" />
            <StatCard icon="⚽" target={104} label="Jogos" />
            <StatCard icon="🏟️" target={16}  label="Cidades" />
            <StatCard icon="🗺️" target={3}   label="Países-sede" />
          </div>
        </div>

        {/* dentro de campo */}
        <div>
          <h3 className="font-display text-lg tracking-widest text-center text-copa-green mb-5">
            DENTRO DE CAMPO
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="🥅" target={308} label="Gols no torneio" />
            <InfoCard icon="👟" value="Mbappé"     sub="10 gols · França"  label="Chuteira de Ouro" />
            <InfoCard icon="🥇" value="Rodri"      sub="Espanha"           label="Bola de Ouro" />
            <InfoCard icon="🧤" value="Unai Simón" sub="Espanha"           label="Luva de Ouro" />
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            Melhor Jovem: <span className="text-gray-300">Pau Cubarsí</span> (ESP) &middot;{' '}
            Fair Play: <span className="text-gray-300">Holanda</span> &middot;{' '}
            Média de <span className="text-gray-300">2,96 gols</span> por jogo
          </p>
        </div>

        {/* fora de campo */}
        <div>
          <h3 className="font-display text-lg tracking-widest text-center text-copa-yellow mb-5">
            FORA DE CAMPO
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard icon="👥" value="Recorde"  sub="maior público da história" label="Público acumulado" />
            <InfoCard icon="📈" value="99,7%"    sub="nos primeiros 60 jogos"     label="Ocupação média" />
            <StatCard icon="🎟️" target={281223}  label="Público em 1 dia" />
            <StatCard icon="💰" target={871} prefix="US$ " suffix=" mi" label="Premiação total" />
          </div>
        </div>
      </section>

      {/* ── ÚLTIMOS RESULTADOS ── */}
      <UltimosResultados />

      {/* ── ACESSO RÁPIDO ── */}
      <section>
        <h2 className="font-display text-2xl tracking-widest text-white mb-6">
          EXPLORAR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickLink to="/tabela"    icon="📅" label="Tabela de Jogos"        desc="Todos os 104 jogos, filtros por fase, grupo e seleção" />
          <QuickLink to="/grupos"    icon="🏆" label="Grupos e Classificação" desc="12 grupos, tabela final com regras FIFA" />
          <QuickLink to="/elencos"   icon="👕" label="Elencos"                desc="48 seleções e seus jogadores" />
          <QuickLink to="/escalacao" icon={<Bandeira iso="BR" className="h-8 w-auto" />} label="Escalação do Brasil" desc="Monte sua escalação com drag & drop" />
        </div>
      </section>

    </div>
  )
}
