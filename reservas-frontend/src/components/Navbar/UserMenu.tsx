import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { UserCircle } from 'lucide-react'

import { User } from '@/modules/users/domain/User';

interface UserMenuProps {
  user: User | null;
  handleLogout: () => void;
}

// function UserMenu({ login, handlerLogout }) {
export const UserMenu: React.FC<UserMenuProps> = ({ user, handleLogout }) => {
  return (
    <>
      <Label className="text-zinc-500 text-sm">{user?.userName}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <UserCircle className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ajustes</DropdownMenuItem>
          <DropdownMenuItem>Soporte</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              asChild
              onClick={handleLogout}
              variant="destructive"
              className="w-full h-7"
            >
              <NavLink to="/">Logout</NavLink>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
