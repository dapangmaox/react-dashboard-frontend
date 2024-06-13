import { ClockIcon, CreditCardIcon, ListTodoIcon } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="flex flex-col p-2">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white flex justify-between py-4 px-6 items-center cursor-pointer group">
          <CreditCardIcon className="w-16 h-16 p-2 text-green-300 group-hover:text-white bg-white group-hover:bg-green-300 rounded-lg" />
          <div className="flex flex-col text-center">
            <span className="text-gray-400 mb-1">今日支出</span>
            <span className="text-gray-500 text-lg font-bold">0.00</span>
          </div>
        </div>
        <div className="bg-white flex justify-between py-4 px-6 items-center cursor-pointer group">
          <ListTodoIcon className="w-16 h-16 p-2 text-green-300 group-hover:text-white bg-white group-hover:bg-green-300 rounded-lg" />
          <div className="flex flex-col text-center">
            <span className="text-gray-400 mb-1">今日待办</span>
            <span className="text-gray-500 text-lg font-bold">0</span>
          </div>
        </div>
        <div className="bg-white flex justify-between py-4 px-6 items-center cursor-pointer group">
          <ClockIcon className="w-16 h-16 p-2 text-green-300 group-hover:text-white bg-white group-hover:bg-green-300 rounded-lg" />
          <div className="flex flex-col text-center">
            <span className="text-gray-400 mb-1">提醒事项</span>
            <span className="text-gray-500 text-lg font-bold">0</span>
          </div>
        </div>
        <div className="bg-white flex justify-between py-4 px-6 items-center cursor-pointer group">
          <CreditCardIcon className="w-16 h-16 p-2 text-green-300 group-hover:text-white bg-white group-hover:bg-green-300 rounded-lg" />
          <div className="flex flex-col text-center">
            <span className="text-gray-400 mb-1">本月支出</span>
            <span className="text-gray-500 text-lg font-bold">0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
