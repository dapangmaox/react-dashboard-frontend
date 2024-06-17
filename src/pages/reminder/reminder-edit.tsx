import FormFieldWrapper from '@/components/FormFieldWrapper';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ApiResponse } from '@/types';
import { Reminder } from '@/types/reminder';
import axiosInstance from '@/utils/axios-config';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ReminderEditProps {
  setReminderList: React.Dispatch<React.SetStateAction<Reminder[]>>;
  editingReminder: Reminder | null;
  setEditingReminder: React.Dispatch<React.SetStateAction<Reminder | null>>;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: '标题长度最少为2',
  }),
  description: z.string(),
  date: z.date(),
});

const ReminderEdit: React.FC<ReminderEditProps> = ({
  setReminderList,
  editingReminder,
  setEditingReminder,
}: ReminderEditProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<Reminder>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date: undefined,
    },
  });

  useEffect(() => {
    if (editingReminder) {
      form.reset(editingReminder);
      setDialogOpen(true);
    }
  }, [editingReminder, form]);

  const handleAddUpdateReminder = async (data: Reminder) => {
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
        data,
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
        form.reset();
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
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>{editingReminder ? '编辑' : '新建'}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(handleAddUpdateReminder)}
              className="space-y-8 mr-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormFieldWrapper label="标题">
                    <Input {...field} />
                  </FormFieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormFieldWrapper label="备注">
                    <Textarea id="description" {...field} />
                  </FormFieldWrapper>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormFieldWrapper label="提醒日期">
                    <DatePicker
                      {...field}
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormFieldWrapper>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={() => {
                    setDialogOpen(false);
                    setEditingReminder(null);
                    form.reset();
                  }}
                >
                  取消
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && (
                    <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  保存
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReminderEdit;
