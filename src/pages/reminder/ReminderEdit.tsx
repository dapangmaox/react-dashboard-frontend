import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ReminderModel } from '@/types/ReminderModel';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { PlusIcon, LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';

interface ReminderEditProps {
  setReminderList: React.Dispatch<React.SetStateAction<ReminderModel[]>>;
}

const ReminderEdit: React.FC<ReminderEditProps> = ({
  setReminderList,
}: ReminderEditProps) => {
  const [formState, setFormState] = useState<ReminderModel>({
    title: '',
    description: '',
    date: undefined,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleAddReminder = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const addedReminder: ReminderModel = await response.json();
        setReminderList((prevReminderList) => [
          addedReminder,
          ...prevReminderList,
        ]);
        // 清空表单字段
        setFormState({
          title: '',
          description: '',
          date: new Date(),
        });
        setDialogOpen(false);
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
            <DialogTitle>编辑</DialogTitle>
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
                备注
              </Label>
              <Textarea
                id="description"
                value={formState.description}
                onChange={handleDescriptionChange}
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
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={'outline'}
              onClick={handleAddReminder}
            >
              取消
            </Button>
            <Button
              type="button"
              onClick={handleAddReminder}
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
