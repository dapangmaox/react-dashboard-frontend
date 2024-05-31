import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-2 px-4 flex mb-3 items-center ${
          isActive ? 'bg-white rounded-xl text-gray-700' : 'text-gray-500'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`p-2 rounded-xl mr-2 ${
              isActive ? 'bg-green-300' : 'bg-white '
            }`}
          >
            <Icon
              className={`w-5 h-5 rounded ${
                isActive ? 'text-white' : 'text-green-300'
              }`}
            />
          </div>
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
