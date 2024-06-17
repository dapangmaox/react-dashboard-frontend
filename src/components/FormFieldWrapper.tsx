import { ReactNode } from 'react';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldWrapperProps {
  label: string;
  children: ReactNode;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <FormItem>
      <div className="grid grid-cols-12 items-center gap-4">
        <FormLabel className="text-right col-span-2">{label}</FormLabel>
        <FormControl className="col-span-10">{children}</FormControl>
      </div>
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-2"></div>
        <FormMessage className="col-span-10" />
      </div>
    </FormItem>
  );
};

export default FormFieldWrapper;
