import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ArenaProvider } from './ArenaContext'
import Nav from './components/layout/Nav'
import AdminLayout from './components/layout/AdminLayout'
import FspAiChat from './components/ui/FspAiChat'
import ReviewModal from './components/ui/ReviewModal'
import ExplorePage from './pages/explore/ExplorePage'
import ArenaDetail from './pages/explore/ArenaDetail'
import JoinFlow from './pages/explore/JoinFlow'
import JoinSuccess from './pages/explore/JoinSuccess'
import CreateArena from './pages/create/CreateArena'
import CaptainDashboard from './pages/dashboard/CaptainDashboard'
import OpsReview from './pages/ops/OpsReview'
import AdminDashboard from './pages/admin/AdminDashboard'
import ArenaManager from './pages/admin/ArenaManager'
import ReferralLinks from './pages/admin/ReferralLinks'

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [showReview, setShowReview] = useState(false)

  if (isAdmin) {
    return (
      <>
        <AdminLayout>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/arenas" element={<AdminDashboard />} />
            <Route path="/admin/arenas/:id" element={<ArenaManager />} />
            <Route path="/admin/arenas/:id/referrals" element={<ReferralLinks />} />
            <Route path="/admin/create" element={<CreateArena />} />
            <Route path="/admin/captains" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/revenue" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/ops" element={<OpsReview />} />
          </Routes>
        </AdminLayout>
        <FspAiChat onCreateArena={() => setShowReview(true)} />
        {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
      </>
    )
  }

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

export default function App() {
  return (
    <ArenaProvider>
      <AppRoutes />
    </ArenaProvider>
  )
}
