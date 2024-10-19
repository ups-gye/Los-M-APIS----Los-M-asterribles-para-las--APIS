import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './sections/shared/hooks'
import { UserRoutes } from './routes/UserRoutes'
import { Skeleton } from './components/ui/skeleton'
import { Navbar } from './components/Navbar'
// import { Home, NotFound } from './sections'
import { Home } from './sections'
import { Login } from './sections/auth/pages'

export const AppRoutes = () => {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col space-y-3 justify-center items-center">
        <Skeleton className="h-[125px] w-[400px] rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <Skeleton className="h-4 w-[350px] bg-slate-200" />
          <Skeleton className="h-4 w-[100px] bg-slate-200" />
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {isAuth ? (
          <Route path="/*" element={<UserRoutes />} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}