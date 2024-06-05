import {
  ClockIcon,
  CreditCardIcon,
  HomeIcon,
  ListTodoIcon,
  NotebookPen,
  UserIcon,
} from 'lucide-react';
import NavItem from './NavItem';

const Sidebar = () => {
  return (
    <div className="w-64 h-full text-gray-700 flex flex-col px-4">
      <div className="mb-3">
        <div className="p-4 text-lg font-bold text-center pt-6">大胖猫</div>
        <div className="flex w-full h-px bg-custom-gradient"></div>
      </div>
      <nav className="flex-grow">
        <NavItem to="/" icon={HomeIcon} label="后台首页" />
        <NavItem to="/todo" icon={ListTodoIcon} label="待办事项" />
        <NavItem to="/reminder" icon={ClockIcon} label="提醒事项" />
        <NavItem to="/daily-work" icon={NotebookPen} label="工作记录" />
        <NavItem to="/bill" icon={CreditCardIcon} label="我的账单" />
        <NavItem to="/profile" icon={UserIcon} label="个人中心" />
      </nav>
    </div>
  );
};

export default Sidebar;
