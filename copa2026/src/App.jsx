import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import TabelaPage from './pages/TabelaPage'
import GruposPage from './pages/GruposPage'
import ElencoPage from './pages/ElencoPage'
import EscalacaoPage from './pages/EscalacaoPage'
import BolaoPage from './pages/BolaoPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tabela"    element={<TabelaPage />} />
        <Route path="grupos"    element={<GruposPage />} />
        <Route path="elencos"   element={<ElencoPage />} />
        <Route path="escalacao" element={<EscalacaoPage />} />
        <Route path="bolao"     element={<BolaoPage />} />
        <Route path="admin"     element={<AdminPage />} />
      </Route>
    </Routes>
  )
}
