import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { onLogin, onLogout, onInitLoading } from '@/redux/states/auth';
import { ApiUserRepository } from '@/modules/users/infrastructure/ApiUsersRepository';
import { loginUser } from '@/modules/users/application/loginUser';
// import { User } from '../modules/users/domain/User';
import Swal from 'sweetalert2';

const userRepository = new ApiUserRepository();

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials: { userName: string; userPassword: string }) => {
    try {
      dispatch(onInitLoading());
      const user = await loginUser(userRepository)(credentials);
      dispatch(onLogin({ user }));
      sessionStorage.setItem('user', JSON.stringify(user));
      return { isAuth: true, user };
    } catch (error) {
      console.error('Login error:', error);
      dispatch(onLogout());
      Swal.fire('Error', 'Invalid username or password', 'error');
      return { isAuth: false, user: null };
    }
  };

  const handleLogout = () => {
    dispatch(onLogout());
    sessionStorage.removeItem('user');
  };

  return {
    isAuth: auth.isAuth,
    user: auth.user,
    isLoading: auth.isLoginLoading,
    handleLogin,
    handleLogout,
  };
};