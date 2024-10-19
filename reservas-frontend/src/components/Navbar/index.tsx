import { NavLink } from 'react-router-dom'
import { useAuth } from '@/sections/shared/hooks'
//Icons
import { BellRing, Home, BarChart, ShoppingCart, LogOut, UserPlus,
  // Menu,
  // Users,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import logo from '../../assets/logo_circular.png'
import { SearchInput } from './SearchInput'
import { UserMenu } from './UserMenu'
import { MenuList } from './Menu'


// const Navbar = () => {
//   const { login, handlerLogout } = useAuth()

export const Navbar: React.FC = () => {
  const { user, isAuth, handleLogout } = useAuth();

  const commonClassesMobile =
    'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2'

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="sticky top-0 z-20">
            {/* Logo */}
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-muted ">
              <NavLink to="" className="flex items-center gap-2 font-semibold">
                <img src={logo} className="h-10 w-10"></img>
                <span className="">Reserva Vuelos</span>
              </NavLink>

              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <BellRing className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>

            <MenuList />

          </div>
        </div>
      </div>

      {/* Navbar Horizontal */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            {/* Navbar movile */}
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src={logo} className="h-8" />
                  <span className="sr-only">Reserva Vuelos</span>
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <Home className="h-5 w-5" />
                  Inicio
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    4
                  </Badge>
                </NavLink>
                <NavLink
                  to="/payments"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <ShoppingCart className="h-5 w-5" />
                  Consulta Reservas
                </NavLink>

                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <BarChart className="h-4 w-4" />
                  Usuarios{' '}
                </NavLink>

              </nav>
            </SheetContent>

          </Sheet>

          {/* Input Buscar */}
          <SearchInput />

          {!isAuth ? (
            <div className="flex gap-3 text-zinc-700 text-sm">
              <NavLink to="/login" className="flex gap-1">
                <LogOut className="size-5" />
                Iniciar Sesión
              </NavLink>
              <NavLink to="/register" className="flex gap-1">
                <UserPlus className="size-5" />
                Registrarse
              </NavLink>
            </div>
          ) : (
            <UserMenu user={user} handleLogout={handleLogout} />
          )}
        </header>
      </div>
    </div>
  )
}

