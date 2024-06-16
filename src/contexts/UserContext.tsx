import { ApiResponse, User } from '@/types';
import axiosInstance from '@/utils/axios-config';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axiosInstance.get<ApiResponse<User>>('/profile');
        const { message, data } = response.data;
        if (message === 'success') {
          setUser(data);
        } else {
          localStorage.removeItem('token');
          navigateRef.current('/login');
        }
      } catch (error) {
        console.error('Failed to fetch user: ', error);
        localStorage.removeItem('token');
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
