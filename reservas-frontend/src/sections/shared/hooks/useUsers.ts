
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

const userRepository = new ApiUserRepository();

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, userSelected, visibleForm, errors, isLoading } = useSelector((state: RootState) => state.users);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers(userRepository)();
      dispatch(loadingUsers(fetchedUsers));
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch(loadingError('Error fetching users'));
    }
  };

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    try {
      const newUser = await createUser(userRepository)(userData);
      dispatch(addUser(newUser));
      Swal.fire('Success', 'User added successfully', 'success');
    } catch (error) {
      console.error('Error adding user:', error);
      dispatch(loadingError('Error adding user'));
    }
  };

  const handleUpdateUser = async (userData: Partial<User> & { id: number }) => {
    try {
      const updatedUser = await updateUser(userRepository)(userData);
      dispatch(updateUserAction(updatedUser));
      Swal.fire('Success', 'User updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user:', error);
      dispatch(loadingError('Error updating user'));
    }
  };

  const handleDeleteUser = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeUser(id));
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    });
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
