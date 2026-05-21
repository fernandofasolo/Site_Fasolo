import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/tabela',    label: 'Tabela'    },
  { to: '/grupos',    label: 'Grupos'    },
  { to: '/elencos',   label: 'Elencos'   },
  { to: '/escalacao', label: 'Escalação' },
  { to: '/bolao',     label: 'Bolão'     },
]

function linkCls({ isActive }) {
  return `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive ? 'bg-copa-green text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
  }`
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-copa-border bg-copa-card sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-14">
        <NavLink to="/" className="font-display text-2xl text-copa-yellow tracking-widest">
          COPA 2026
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1 items-center">
          {NAV.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkCls}>{label}</NavLink>
          ))}
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `ml-2 p-2 rounded-lg text-lg transition-colors ${
                isActive ? 'text-copa-yellow' : 'text-gray-700 hover:text-gray-400'
              }`
            }
            title="Admin"
          >
            ⚙️
          </NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-copa-border bg-copa-card px-4 py-2 flex flex-col gap-1">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-copa-green text-white' : 'text-gray-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/admin"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium ${
                isActive ? 'text-copa-yellow' : 'text-gray-600'
              }`
            }
          >
            Admin
          </NavLink>
        </nav>
      )}
    </header>
  )
}
