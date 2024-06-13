// BuilderContext.tsx
import { ReactNode, createContext, useContext, useState } from "react";
import { AppType } from "src/types/app";

interface BuilderContextType {
  builderData: AppType;
  updateBuilderData: (newData: AppType) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilderContext = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilderContext must be used within a BuilderProvider");
  }
  return context;
};

interface BuilderProviderProps {
  children: ReactNode;
  app: AppType;
}

export const BuilderProvider = ({ children, app }: BuilderProviderProps) => {
  const [builderData, setBuilderData] = useState(app);

  const updateBuilderData = (newData: AppType) => {
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
      {builderData ? (
        children
      ) : (
        <div className="w-full p-10 text-center text-xl text-red-600">
          <p>Something went wrong</p>
          <p>Please try again later</p>
        </div>
      )}
    </BuilderContext.Provider>
  );
};
