import { useBuilderContext } from '../context/builder-context';

// useForm.ts

export const useBuilder = () => {
  const { builderData, updateBuilderData } = useBuilderContext();

  const handleInputChange = (e: {
    target:
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | (HTMLButtonElement & {
          name: string;
          value: string;
        })
      | {
          name: string;
          value: string;
        };
  }) => {
    const { name, value } = e.target;
    // Update the form data
    updateBuilderData({
      ...builderData,
      [name]: value,
    });
  };

  return { builderData, handleInputChange };
};
