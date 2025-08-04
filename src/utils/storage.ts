import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = 'users'; // <- minúsculo, igual ao do RegisterScreen

export const saveUser = async (user: User) => {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = async (): Promise<User[]> => {
  const usersString = await AsyncStorage.getItem(USERS_KEY);
  return usersString ? JSON.parse(usersString) : [];
};

export const validateLogin = async (email: string, password: string): Promise<boolean> => {
  const users = await getUsers();
  return users.some(u => u.email === email && u.password === password);
};

