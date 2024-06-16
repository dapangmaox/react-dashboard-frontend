import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Reminder } from '@/types/reminder';
import { Label } from '@radix-ui/react-label';
import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios-config';
import { ApiResponse } from '@/types';

interface ReminderEditProps {
  setReminderList: React.Dispatch<React.SetStateAction<Reminder[]>>;
  editingReminder: Reminder | null;
  setEditingReminder: React.Dispatch<React.SetStateAction<Reminder | null>>;
}

const ReminderEdit: React.FC<ReminderEditProps> = ({
  setReminderList,
  editingReminder,
  setEditingReminder,
}: ReminderEditProps) => {
  const [formState, setFormState] = useState<Reminder>({
    title: '',
    description: '',
    date: undefined,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingReminder) {
      setFormState(editingReminder);
      setDialogOpen(true);
    }
  }, [editingReminder]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormState((prevState) => ({
      ...prevState,
      date: date || new Date(),
    }));
  };

  const handleAddUpdateReminder = async () => {
    setLoading(true);
    try {
      const url = `/reminder${editingReminder ? '/' + editingReminder.id : ''}`;
      const method = editingReminder ? 'patch' : 'post';

      const response = await axiosInstance<ApiResponse<Reminder>>({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formState,
      });

      const { message, data: addedReminder } = response.data;

      if (message === 'success') {
        setReminderList((prevReminderList) =>
          editingReminder
            ? prevReminderList.map((reminder) =>
                reminder.id === addedReminder.id ? addedReminder : reminder
              )
            : [addedReminder, ...prevReminderList]
        );
        setFormState({
          title: '',
          description: '',
          date: undefined,
        });
        setDialogOpen(false);
        setEditingReminder(null);
      } else {
        console.error('Failed to add reminder');
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to add reminder: ', error);
    }
  };

  return (
    <div className="mb-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2 w-4 h-4" />
            新建
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingReminder ? '编辑' : '新建'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 pr-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                标题
              </Label>
              <Input
                id="title"
                value={formState.title}
                onChange={handleTitleChange}
                className="col-span-5"
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                日期
              </Label>
              <DatePicker
                selectedDate={formState.date}
                onDateChange={handleDateChange}
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                备注
              </Label>
              <Textarea
                id="description"
                value={formState.description}
                onChange={handleDescriptionChange}
                className="col-span-5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                setDialogOpen(false);
                setEditingReminder(null);
              }}
            >
              取消
            </Button>
            <Button
              type="button"
              onClick={handleAddUpdateReminder}
              disabled={loading}
            >
              {loading && (
                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReminderEdit;
