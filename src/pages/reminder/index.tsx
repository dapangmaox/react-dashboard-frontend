import { useEffect, useState } from 'react';
import ReminderEdit from './reminder-edit';
import ReminderList from './reminder-list';
import { Reminder } from '@/types/reminder';

const ReminderPage = () => {
  const [reminderList, setReminderList] = useState<Reminder[]>([]);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    const fetchReminderList = async () => {
      try {
        const response = await fetch(`/api/reminder`);
        const list: Reminder[] = await response.json();
        setReminderList(list);
      } catch (error) {
        console.error('Failed to fetch reminder list: ', error);
      }
    };

    fetchReminderList();
  }, []);

  const handleEdit = (reminder: Reminder) => {
    setEditingReminder(reminder);
  };

  const handleDelete = async (reminderId: number) => {
    try {
      const response = await fetch(`/api/reminder/${reminderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReminderList((prevReminderList) =>
          prevReminderList.filter((reminder) => reminder.id !== reminderId)
        );
      } else {
        console.error('Failed to delete reminder');
      }
    } catch (error) {
      console.error('Failed to delete reminder: ', error);
    }
  };

  return (
    <div className="flex flex-col">
      <ReminderEdit
        setReminderList={setReminderList}
        editingReminder={editingReminder}
        setEditingReminder={setEditingReminder}
      />
      <ReminderList
        reminderList={reminderList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ReminderPage;
