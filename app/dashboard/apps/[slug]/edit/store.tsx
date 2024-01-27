"use client";
import { ReactNode, createContext, useContext, useState } from "react";

import {
  AppTypeWithId
} from "src/models/app";

export const DEFAULT_APP: AppTypeWithId = {
  _id: "",
  version: "",
  membership: [],
  appId: "",
  name: "",
  description: "",
  slug: "",
  categories: [],
  tags: [],
  status: "draft",
  icon: "",
  bannerImage: "",
  developer: {
    name: "",
    username: "",
    userId: "",
  },
  formFlow: {
    menuType: "text_input_to_text_output",
    inputs: [],
    output: {
      render_type: "markdown",
      save_to_db: false,
    },
    controls: [],
  },
  config: {
    model: "",
    modelType: "huggingface",
    prompt: "",
    params: {}
  },
}
// BuilderContext.tsx

interface BuilderContextType {
    builderData: AppTypeWithId;
    updateBuilderData: (newData: AppTypeWithId) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilderContext = () => {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilderContext must be used within a BuilderProvider');
    }
    return context;
};

interface BuilderProviderProps {
    children: ReactNode;
    app: AppTypeWithId;
}

export const BuilderProvider = ({ children, app }: BuilderProviderProps) => {
    const [builderData, setBuilderData] = useState(app);

    const updateBuilderData = (newData: AppTypeWithId) => {
        setBuilderData({ ...builderData, ...newData });
    };
    // pro user only
    // useEffect(() => {
        //  save builderData to localStorage

        // if(!builderData) return;
        // let savedData = localStorage.getItem('builderData');
        // if (savedData) {
        //     localStorage.removeItem('builderData');
        // }
        
        // if (builderData){
        //     localStorage.setItem('builderData', JSON.stringify(builderData));
        // }   


    // },[builderData]);//[builderData] is the dependency array, which tells React to only re-run the effect if builderData changes

    return (
        <BuilderContext.Provider value={{ builderData, updateBuilderData }}>
            {builderData ? children :
                <div className='w-full p-10 text-center text-xl text-red-600'>
                    <p>Something went wrong</p>
                    <p>Please try again later</p>
                </div>
            }
        </BuilderContext.Provider>
    );
};
