import axios, { AxiosResponse } from 'axios'

// Definir la interfaz para las credenciales de usuario
interface UserCredentials {
  userName: string
  userPassword: string
}

// Definir la interfaz para la respuesta del servidor (ajustada según respuesta de API /login)
interface LoginResponse {
  //message: string
  //token: string
  id: number
  userName: string
  userPassword: string
}

type AxiosLoginResponse = AxiosResponse<LoginResponse>

// const loginUser = async ({ userName, userPassword }) => {
//   try {
//     return await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
//       userName,
//       userPassword,
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//viene de useAuth
//mod email

const loginUser = async ({
  userName,
  userPassword
}: UserCredentials): Promise<AxiosLoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      {
        userName,
        userPassword
      }
    )
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Se devuelve el error de Axios
      return Promise.reject(error)
    } else {
      console.error('Unexpected error:', error)
      return Promise.reject(new Error('An unexpected error occurred'))
    }
  }
  //return userLogin.userName === 'admin' && userLogin.userPassword === '12345' ? true : false;
}

export { loginUser }
