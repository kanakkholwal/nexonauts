import { inputType } from 'src/models/app';
import ComboBox from '../components/combobox';
import DropDownField from '../components/dropdown';
import InputField from '../components/input';
import RadioButtonField from '../components/radio';
import SliderField from '../components/slider';
import TextBoxField from '../components/textarea';

interface TextInputToTextOutputProps {
  inputs: inputType[];
  value: any;
  handleChange: any;
}
export default function TextInputToTextOutput({
  inputs,
  value,
  handleChange,
}: TextInputToTextOutputProps) {
  return (
    <div className="flex flex-col gap-2">
      {inputs.map((input, index) => {
        if (input.field_type === 'text_input')
          return (
            <InputField
              input={input}
              key={index}
              value={value}
              onChange={handleChange}
            />
          );
        else if (input.field_type === 'number_input')
          return (
            <SliderField
              input={input}
              key={index}
              type="number"
              value={value}
              onChange={handleChange}
            />
          );
        else if (input.field_type === 'radio')
          return (
            <RadioButtonField
              input={input}
              key={index}
              value={value}
              onChange={handleChange}
            />
          );
        else if (
          input.field_type === 'dropdown' ||
          input.field_type === 'autoComplete'
        )
          return (
            <DropDownField
              input={input}
              key={index}
              value={value}
              onChange={handleChange}
            />
          );
        else if (input.field_type === 'dropdown_editable')
          return (
            <ComboBox
              input={input}
              key={index}
              value={value}
              onChange={handleChange}
            />
          );
        else if (input.field_type === 'text_multiline')
          return (
            <TextBoxField
              input={input}
              key={index}
              value={value}
              onChange={handleChange}
            />
          );
        else
          return (
            <div key={index}>
              <p>Field type not supported</p>
              {input.field_type}
            </div>
          );
      })}
    </div>
  );
}
