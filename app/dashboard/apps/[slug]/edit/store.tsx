"use client";
import React, { Dispatch, createContext, useContext, useReducer } from 'react';
import { IApp } from 'src/models/app';

interface AppContextProps {
  state: IApp;
  dispatch: Dispatch<AppAction>;
}
type AppAction = { type: "", payload: Partial<IApp> };

const appReducer = (state: IApp, action: AppAction): IApp => {
  switch (action.type) {
    case 'UPDATE_APP':
      return { ...state, ...action.payload };
    case 'UPDATE_APP_NAME':
      return { ...state, name: action.payload };
    case 'UPDATE_APP_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'UPDATE_APP_IMAGE':
      return { ...state, image: action.payload };
    case 'UPDATE_APP_URL':
      return { ...state, url: action.payload };
    case 'UPDATE_APP_TAGS':
      return { ...state, tags: action.payload };
    case 'UPDATE_APP_CATEGORY':
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC = ({ children }:{
  children: React.ReactNode;
}) => {
  const initialState: IApp = {
    appId:"" ,
    config:{},
    keywords: [],
    isPublic: false,
    hasCustomFunction: false,
    status: 'draft' ,
    version: '0.0.1',
    name: '',
    shortDescription: '',
    description: "",
    type: "",
    categories:[],
    tags:[],
    developer: { name: "", username: "", userId:  null },
    path: "",
    membership:[],
    coverImage: "",
    icon: "",
    isRecommended: false,
    averageRating: 0,
    formFlow:{
      menuType: "text_input_to_text_output",
      inputs: [],
      controls: [],
      output:{
        render_type: "markdown",
        save_to_db:false,
      }
    }


  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;
