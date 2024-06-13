import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const userContext = useContext(UserContext);

  if (!userContext) return null;

  const { user } = userContext;

  return (
    <div className="flex justify-between items-center p-2">
      <div className="text-lg font-bold"></div>
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-full text-slate-700">
          Welcome, {user?.username}
        </div>
      </div>
    </div>
  );
};

export default Header;
