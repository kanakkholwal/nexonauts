'use client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { RenderOutput, RenderOutputType } from 'src/layouts/apps/view/output';

// Components

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsStars } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import TextInputToTextOutput from 'src/layouts/apps/common/view/text_input_to_text_output';
import { SessionUserType } from 'src/types/user';
import { useAppStore } from './store';

export default function AppEdit({ user }: { user: SessionUserType }) {
  const app = useAppStore((state) => state);

  console.log('preview -mode ', app);

  const [value, handleChange] = useForm(makeInitialObject(app.formFlow.inputs));

  const [output, setOutput] = useState<RenderOutputType>({
    type: 'text/plain',
    data: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const apiCall = async () => {
    setLoading(true);
    setOutput({
      ...output,
      data: null,
    });
    // check if all required inputs are filled
    const requiredInputs = app.formFlow.inputs.filter(
      (input) => input.field_required
    );
    const requiredInputIds = requiredInputs.map((input) => input.field_name);
    const missingRequiredInputs = requiredInputIds.filter(
      (inputId) => !value[inputId]
    );
    if (missingRequiredInputs.length > 0) {
      toast.error(
        `Please fill in the following required inputs: ${missingRequiredInputs.join(', ')}`
      );
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('/api/apps/playground', {
        userId: user._id,
        appId: app.appId,
        appInputs: {
          ...value,
        },
        config: app.config,
      });
      setOutput(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2 flex flex-col gap-5 mt-5">
      <h1 className="text-3xl font-bold">{app.name}</h1>
      <p className="text-slate-500 mt-2 line-clamp-3">{app.description}</p>
      <Card className="w-full max-w-[1024px]">
        <CardContent className="flex flex-col gap-2 pt-5">
          {app.formFlow.menuType === 'text_input_to_text_output' && (
            <TextInputToTextOutput
              inputs={app.formFlow.inputs}
              value={value}
              handleChange={handleChange}
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-row gap-2 justify-center items-center">
          {/* {app.formFlow.controls.map((control, index) => {
                    if (control.action === "get_output") */}
          {/* return ( */}
          <Button
            //  key={index}
            variant="gradient_blue"
            onClick={() => apiCall()}
            disabled={loading || Object.keys(value).length === 0}
          >
            {loading ? 'Generating...' : 'Generate'}
            {loading ? (
              <CgSpinner className="w-4 h-4 ml-2 animate-spin" />
            ) : (
              <BsStars className="w-4 h-4 ml-2" />
            )}
          </Button>
          {/* else
                        return null
                })} */}
        </CardFooter>
      </Card>
      <RenderOutput
        output={output}
        loading={loading}
        outputConfig={app.formFlow.output}
      />
    </div>
  );
}
const useForm = (initialValues) => {
  //storing initial values of the form
  const [values, setValues] = useState(initialValues);

  //function that handles the change in the form
  // console.log("initialValues", initialValues)

  function handleChange(target) {
    //destruct the event.target object
    const { name, value, type, checked } = target;
    //checked and unchecked for check box

    setValues((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
    // console.log("values", values)
  }

  //returning an array that contains an object and the funtion that changes the value

  return [values, handleChange];
};
function makeInitialObject(inputs: any[]) {
  const obj = {};
  inputs?.forEach((input: any) => {
    obj[input.id] = input.defaultValue || '';
  });
  return obj;
}

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eee" offset="20%" />
      <stop stop-color="#ccc" offset="50%" />
      <stop stop-color="#eee" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eee" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
