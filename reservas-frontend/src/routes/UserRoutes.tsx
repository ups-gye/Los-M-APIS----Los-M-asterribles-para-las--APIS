// src/routes/UserRoutes.tsx
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home, UsersPage, ClientsPage } from '../sections'
import {  BookingPage } from '../sections/bookings'

export function UserRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="clients" element={<ClientsPage />} />
      <Route path="payments" element={<BookingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
