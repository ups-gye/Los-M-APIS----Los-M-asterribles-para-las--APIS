// src/routes/UserRoutes.tsx
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home, UsersPage, ClientsPage } from '../sections'

export function UserRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="clients" element={<ClientsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
