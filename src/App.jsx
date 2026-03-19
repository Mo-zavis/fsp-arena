import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/layout/Nav'
import ExplorePage from './pages/explore/ExplorePage'
import ArenaDetail from './pages/explore/ArenaDetail'
import JoinFlow from './pages/explore/JoinFlow'
import JoinSuccess from './pages/explore/JoinSuccess'
import CreateArena from './pages/create/CreateArena'
import CaptainDashboard from './pages/dashboard/CaptainDashboard'
import OpsReview from './pages/ops/OpsReview'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/arenas" replace />} />
        <Route path="/arenas" element={<ExplorePage />} />
        <Route path="/arenas/:id" element={<ArenaDetail />} />
        <Route path="/arenas/:id/join" element={<JoinFlow />} />
        <Route path="/arenas/:id/joined" element={<JoinSuccess />} />
        <Route path="/create" element={<CreateArena />} />
        <Route path="/dashboard" element={<CaptainDashboard />} />
        <Route path="/ops/reviews" element={<OpsReview />} />
      </Routes>
    </>
  )
}
