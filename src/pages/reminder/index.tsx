import { ReminderModel } from '@/types/ReminderModel';
import { useEffect, useState } from 'react';
import ReminderEdit from './ReminderEdit';
import ReminderList from './ReminderList';

const Reminder = () => {
  const [reminderList, setReminderList] = useState<ReminderModel[]>([]);
  const [editingReminder, setEditingReminder] = useState<ReminderModel | null>(
    null
  );

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

  const handleEdit = (reminder: ReminderModel) => {
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

export default Reminder;
