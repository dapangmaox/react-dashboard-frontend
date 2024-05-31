import { ReminderModel } from '@/types/ReminderModel';
import { useEffect, useState } from 'react';
import ReminderEdit from './ReminderEdit';
import ReminderList from './ReminderList';

const Reminder = () => {
  const [reminderList, setReminderList] = useState<ReminderModel[]>([]);

  useEffect(() => {
    const fetchReminderList = async () => {
      try {
        const response = await fetch(`/api/reminder`);
        const list: ReminderModel[] = await response.json();
        setReminderList(list);
      } catch (error) {
        console.error('Failed to fetch reminder list: ', error);
      }
    };

    fetchReminderList();
  }, []);

  return (
    <div className="flex flex-col">
      <ReminderEdit setReminderList={setReminderList} />
      <ReminderList reminderList={reminderList} />
    </div>
  );
};

export default Reminder;
