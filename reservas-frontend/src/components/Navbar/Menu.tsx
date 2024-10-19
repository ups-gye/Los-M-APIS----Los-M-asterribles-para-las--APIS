import React from 'react';
import { Badge } from '@/components/ui/badge'
import { NavLink } from 'react-router-dom'
import { 
  Home, 
  BarChart, 
  ShoppingCart, 
  // Users
} from 'lucide-react';
import { useAuth } from '@/sections/shared/hooks'


// export const MenuList = () => {
export const MenuList: React.FC = () => {
  const { user } = useAuth();

  const commonClasses = 'flex items-center gap-3 rounded-lg px-3 py-2'

  return (
    <>
      {/* Navbar Vertical */}
      <div className="flex-1 bg-muted overflow-y-scroll">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <Home className="h-4 w-4" />
            Inicio
            <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
              4
            </Badge>
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <ShoppingCart className="h-4 w-4" />
            Consulta Reservas
          </NavLink>
          
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `${commonClasses} ${
                isActive
                  ? 'bg-muted text-primary transition-all hover:text-primary'
                  : 'text-muted-foreground transition-all hover:text-primary'
              }`
            }
          >
            <BarChart className="h-4 w-4" />
            Usuarios{' '}
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/users/selectRegister"
                className={({ isActive }) =>
                  `${commonClasses} ${
                    isActive
                      ? 'bg-muted text-primary transition-all hover:text-primary'
                      : 'text-muted-foreground transition-all hover:text-primary'
                  }`
                }
              >
                <BarChart className="h-4 w-4" />
                Registar Usuarios{' '}
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </>
  )
}
