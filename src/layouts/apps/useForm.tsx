import { useFormContext } from './form-context';

// useForm.ts

export const useForm = () => {
  const { formData, updateFormData } = useFormContext();

  const handleInputChange = (e
    : {
    target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLButtonElement & {
      name: string;
      value: string;
    } | {
      name: string;
      value: string;
    }

  }
  ) => {
    const { name, value } = e.target;
    // Update the form data
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  return { formData, handleInputChange };
};
