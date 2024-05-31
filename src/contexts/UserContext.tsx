import { ReactNode, createContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `/api/user/user/${'liangxwei1030@163.com'}`,
          {
            headers: {
              UserID: 'liangxwei',
            },
          }
        );
        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user: ', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
