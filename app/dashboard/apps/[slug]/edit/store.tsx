import {
  AppTypeWithId,
  ConfigurationType,
  formFlowType,
  inputType,
  outputType
} from "src/models/app";
import { create } from 'zustand';

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

type Actions = {
  UPDATE_NAME: (name: AppTypeWithId["name"]) => Partial<AppTypeWithId>;
  UPDATE_DESCRIPTION: (description: AppTypeWithId["description"]) => Partial<AppTypeWithId>;
  UPDATE_SLUG: (slug: AppTypeWithId["slug"]) => Partial<AppTypeWithId>;
  ADD_CATEGORY: (category: keyof AppTypeWithId["categories"]) => Partial<AppTypeWithId>;
  REMOVE_CATEGORY: (index: number) => Partial<AppTypeWithId>;
  ADD_TAG: (tag: keyof AppTypeWithId["tags"]) => Partial<AppTypeWithId>;
  REMOVE_TAG: (index: number) => Partial<AppTypeWithId>;
  SET_ICON: (icon: AppTypeWithId["icon"]) => Partial<AppTypeWithId>;
  SET_BANNER: (bannerImage: AppTypeWithId["bannerImage"]) => Partial<AppTypeWithId>;
  UPDATE_MENU_TYPE: (menuType: formFlowType["menuType"]) => Partial<AppTypeWithId>;
  ADD_INPUT: (input: inputType) => Partial<AppTypeWithId>;
  REMOVE_INPUT: (index: number) => Partial<AppTypeWithId>;
  UPDATE_INPUT: (input: inputType) => Partial<AppTypeWithId>;
  UPDATE_OUTPUT: (output: outputType) => Partial<AppTypeWithId>;
  UPDATE_MODEL: (model: ConfigurationType["model"]) => Partial<AppTypeWithId>;
  UPDATE_CONFIGURATION: (configuration: ConfigurationType) => Partial<AppTypeWithId>;
  UPDATE_PROMPT: (prompt: ConfigurationType["prompt"]) => Partial<AppTypeWithId>;
  UPDATE_CONFIG_PARAMS: (configParams: ConfigurationType["params"]) => Partial<AppTypeWithId>;
};
type Action = {
  type: keyof Actions;
  payload: Parameters<Actions[keyof Actions]>[0];
};
// Define the state type
type State = AppTypeWithId & {
  dispatch: (action: Action) => void;
};

const appReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload }
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload }
    case "UPDATE_SLUG":
      return { ...state, slug: action.payload }
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] }
    case "REMOVE_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] }
    case "ADD_TAG":
      return { ...state, tags: [...state.tags, action.payload] }
    case "REMOVE_TAG":
      return { ...state, tags: [...state.tags, action.payload] }
    case "SET_ICON":
      return { ...state, icon: action.payload }
    case "SET_BANNER":
      return { ...state, bannerImage: action.payload }
    case "UPDATE_MENU_TYPE":
      return { ...state,formFlow: { ...state.formFlow, menuType: action.payload } }
    case "ADD_INPUT":
      return { ...state, formFlow: { ...state.formFlow, inputs: [...state.formFlow.inputs, action.payload] } }
    case "REMOVE_INPUT":
      return { ...state, formFlow: { ...state.formFlow, inputs: state.formFlow.inputs.filter((_, i) => i !== action.payload) } }
    case "UPDATE_INPUT":
      const { field_id, ...rest } = action.payload as inputType;
      return { ...state, formFlow: { ...state.formFlow, inputs: state.formFlow.inputs.map(obj => {
        if (obj.field_id === field_id) {
          // If the object's id matches, update it with the new data
          return { ...obj, ...rest };
        } else {
          // If it's not the target object, leave it unchanged
          return obj;
        }
      }) } }
      
    case "UPDATE_OUTPUT":
      return { ...state, formFlow: { ...state.formFlow, output: action.payload } }
    case "UPDATE_MODEL":
      return { ...state, config: { ...state.config, model: action.payload } }
    case "UPDATE_CONFIGURATION":
      return { ...state, config: action.payload }
    case "UPDATE_PROMPT":
      return { ...state, config: { ...state.config, prompt: action.payload } }
    case "UPDATE_CONFIG_PARAMS":
      return { ...state, config: { ...state.config, params: action.payload } }
    default:
      return state
  }
}
// export const createAppStore = (initProps?: Partial<AppTypeWithId>) => {

//   return createStore<State>()((set) => ({
//     ...DEFAULT_APP,
//     ...initProps,
//     dispatch: (action: Action) => set(state => appReducer(state, action)),
//   }))
// }
// Create the Zustand store
export const useAppStore = create<AppTypeWithId>((set) => ({
  ...DEFAULT_APP,
}));