"use client";

import { Label } from "@/components/ui/label";
import { AppTypeWithId } from "src/models/app";
import { useAppStore } from '../store';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useState } from 'react';
import toast from "react-hot-toast";
import { SessionUserType } from 'src/types/user';


export default function OutputTab({
    user
}: {
    user: SessionUserType
}) {
    const app = useAppStore(state => state);

    const [isLoading, setIsLoading] = useState(false);

    async function updateApp(appObject: AppTypeWithId) {



        return new Promise(async (resolve, reject) => {


            await axios.put(`/api/apps/${app.appId.toString()}/update`, {
                appData: appObject,
                userId: user._id
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        toast.success("App Updated successfully");
                        resolve(response.data);
                    } else {
                        toast.error("Something went wrong please try again");
                        reject(response.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong please try again");
                    reject(err.detail);
                })
                .finally(() => {
                    setIsLoading(false);
                })

        })

    }


    function CreatePostaleObject(): AppTypeWithId {

        return {
            ...app,
            slug:  app.appId.toLowerCase().replaceAll(/ /g, "-").replaceAll("_", "-"),


            // data: {
            //     ...app.data,
            //     prompt: prompt,
            //     model: app.data.model,
            //     hyperparameters: {
            //         ...app.data.hyperparameters,
            //         temperature: app.data.hyperparameters.temperature,
            //         max_tokens: app.data.hyperparameters.max_tokens,
            //         top_p: app.data.hyperparameters.top_p,
            //         frequency_penalty: app.data.hyperparameters.frequency_penalty,
            //         presence_penalty: app.data.hyperparameters.presence_penalty,
            //         topP: app.data.hyperparameters.topP,
            //         topK: app.data.hyperparameters.topK,
            //         maxOutputTokens: app.data.hyperparameters.maxOutputTokens,
            //     }
            // }
        }
    }


    return (<> <div className=" w-full mb-2">
        <Label htmlFor='output_type'>Output Type
        <span className="text-xs text-red-400"> *</span>

        </Label>
        <Select
            name='output_type'
            onValueChange={(value) => {
                useAppStore.setState((state) => {
                    return {
                        ...state,
                        formFlow: {
                            ...state.formFlow,
                            output: {
                                ...state.formFlow.output,
                                render_type: value as string
                            }
                        }
                    }
                })
                
            }}
            defaultValue={app.formFlow.output.render_type ?? "plain/text"}
        >
            <SelectTrigger className="w-[180px] bg-slate-100">
                <SelectValue placeholder="Output Type" />
            </SelectTrigger>
            <SelectContent>
                {OUTPUT_TYPES.map((item) => {
                    return (
                        <SelectItem key={item} value={item}>
                            {item}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>

    </div>


        <div className='flex justify-between items-center gap-2 mt-2'>
            <Label htmlFor="output_save_to_db">
                Save to Database
            </Label>
            <Switch
                id="output_save_to_db" name="output_save_to_db"
                checked={app.formFlow.output.save_to_db ?? false}
                disabled={isLoading || user.account_type === "free"}

                onCheckedChange={(checked) => {
                    useAppStore.setState((state) => {
                        return {
                            ...state,
                            formFlow: {
                                ...state.formFlow,
                                outputs: {
                                    ...state.formFlow.output,
                                    save_to_db: checked as boolean
                                }
                            }
                        }
                    })
                

                }}
            />
        </div>
        <div className='flex justify-between items-center gap-2 mt-2'>

            <Button disabled={isLoading}
                onClick={() => {
                    setIsLoading(true);
                    toast.promise(updateApp(CreatePostaleObject()), {
                        loading: "Saving...",
                        success: (data) => {
                            setIsLoading(false);
                            return "Saved";
                        },
                        error: (err) => {
                            setIsLoading(false);
                            return err;
                        },
                    });
                    

                }}
                className="w-full"
            >
                Update and Submit
            </Button>

        </div>


    </>)
}
const OUTPUT_TYPES = [
    "markdown",
    "html",
    "plain/text",
]
const replaceWords = (sentence: string, wordList: string[]) => {
    let replacedSentence = sentence;

    for (const word of wordList) {
        const regex = new RegExp(`@${word}\\b`, 'g');
        replacedSentence = replacedSentence.replace(regex, `<<<USER_INPUT_VALUE>>>${word}<<</USER_INPUT_VALUE>>>`);
    }

    return replacedSentence;
};