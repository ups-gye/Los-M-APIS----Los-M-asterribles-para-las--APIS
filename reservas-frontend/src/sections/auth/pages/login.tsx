import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../shared/hooks/useAuth';
import { useUsers } from '../../shared/hooks/useUsers';
import { User } from '@/modules/users/domain/User';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator';
import { Layout } from '@/components/Layout';

type TabType = 'account' | 'register';

interface LoginForm {
  userName: string;
  userPassword: string;
}

export const Login: React.FC = () => {
  const [selected, setSelected] = useState<TabType>('account');
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { handleAddUser } = useUsers();

  const loginForm = useForm<LoginForm>({
    defaultValues: {
      userName: '',
      userPassword: ''
    }
  });

  const registerForm = useForm<User>({
    defaultValues: {
      userName: '',
      userPassword: ''
    }
  });

  const onLoginSubmit = async (data: LoginForm) => {
    const result = await handleLogin(data);
    if (result.isAuth) {
      navigate('/users');
    }
  };

  const onRegisterSubmit = async (data: User) => {
    try {
      await handleAddUser(data);
      setSelected('account');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Bienvenido</h1>
      </div>
      <Separator />
      <div className="w-full h-full justify-center gap-4 m-5 grid grid-rows-4 lg:grid-rows-1 grid-flow-col">

        <div className="w-full h-full flex flex-col justify-center items-center">
          <Tabs value={selected} onValueChange={(value) => setSelected(value as TabType)} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Login Account</CardTitle>
                  <CardDescription>Introduzca sus credenciales para iniciar sesión.</CardDescription>
                </CardHeader>

                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-8">
                    <CardContent className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="userPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">Login</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register Account</CardTitle>
                  <CardDescription>Crear una nueva cuenta.</CardDescription>
                </CardHeader>

                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-8">
                    <CardContent className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Choose a username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="userPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Choose a password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">Register</Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </Layout>
  );
};