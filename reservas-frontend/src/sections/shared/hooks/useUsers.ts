
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { ApiUserRepository } from '@/modules/users/infrastructure/ApiUsersRepository';
import { getUsers } from '@/modules/users/application/getUsers';
import { createUser } from '@/modules/users/application/createUser';
import { updateUser } from '@/modules/users/application/updateUser';
import { User } from '@/modules/users/domain/User';
import {
  loadingUsers,
  addUser,
  updateUser as updateUserAction,
  removeUser,
  onSelectedUserForm,
  onOpenForm,
  onCloseForm,
  loadingError,
} from '@/redux/states/users';
import Swal from 'sweetalert2';
import { useCallback } from 'react';

const userRepository = new ApiUserRepository();

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, userSelected, visibleForm, errors, isLoading } = useSelector((state: RootState) => state.users);

  const fetchUsers = useCallback(async () => {
    if (!isLoading) return; // Evita fetchs innecesarios si ya tenemos datos
    
    try {
      const fetchedUsers = await getUsers(userRepository)();
      dispatch(loadingUsers(fetchedUsers));
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch(loadingError('Error fetching users'));
      Swal.fire('Error', 'Error al cargar usuarios', 'error');
    }
  }, [dispatch, isLoading]);

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    try {
      const newUser = await createUser(userRepository)(userData);
      dispatch(addUser(newUser));
      Swal.fire('Success', 'Usuario creado exitosamente', 'success');
    } catch (error) {
      console.error('Error adding user:', error);
      dispatch(loadingError('Error adding user'));
      Swal.fire('Error', 'Error al crear usuario', 'error');
    }
  };

  const handleUpdateUser = async (userData: User) => {
    try {
      await updateUser(userRepository)(userData);
      dispatch(updateUserAction(userData));
      Swal.fire('Success', 'Usuario actualizado exitosamente', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
      dispatch(loadingError('Error updating user'));
      Swal.fire('Error', 'Error al actualizar usuario', 'error');
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: '¿Está seguro?',
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        // solo se actualiza el estado ya que no hay endpoint para eliminar
        dispatch(removeUser(id));
        Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire('Error', 'Error al eliminar usuario', 'error');
    }
  };

  return {
    users,
    userSelected,
    visibleForm,
    errors,
    isLoading,
    fetchUsers,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    onSelectedUserForm: (user: User) => dispatch(onSelectedUserForm(user)),
    onOpenForm: () => dispatch(onOpenForm()),
    onCloseForm: () => dispatch(onCloseForm()),
  };
};
