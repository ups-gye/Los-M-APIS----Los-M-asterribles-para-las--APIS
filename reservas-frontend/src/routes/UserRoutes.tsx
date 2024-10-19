// src/routes/UserRoutes.tsx
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from '@/sections/shared/hooks'
// import { Home, UsersPage } from '../pages'
import { Home, UsersPage } from '../sections'

export function UserRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="users/page/:page" element={<UsersPage />} />
      {user && (
        <>
          <Route path="users/edit/:id" element={<UsersPage />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
