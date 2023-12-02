import { createContext, useContext, useReducer } from 'react';

export const AppContext = createContext<AppParamType | null>(null);
export const AppDispatchContext = createContext<
  ({ type, payload }: { type: string; payload: AppParamType }) => void
>(() => {});

export type AppParamType = {
  sl?: string;
  tl?: string;
  text?: string;
  op?: string;
  url?: string;
};
export const initAppState: AppParamType = {
  sl: 'English',
  tl: 'Japanese',
  text: '',
  op: 'texts',
  url: '/',
};

const reducer = (
  state: AppParamType,
  { type, payload }: { type: string; payload: AppParamType }
): AppParamType => {
  let newState: AppParamType = {};
  let newUrl: string;
  console.log(
    `action type : ${type}, prev : ${JSON.stringify(
      state
    )}, payload : ${JSON.stringify(payload)}`
  );
  switch (type) {
    case 'initialize':
      newState = { ...state, ...payload };
      break;
    case 'selectSourceLang':
    case 'selectTargetLang':
    case 'toggleLang':
    case 'changeSourceContent':
    case 'clearSourceContent':
    case 'changeOperation':
      const { sl, tl, text, op } = { ...state, ...payload };
      newUrl = `/?sl=${sl}&tl=${tl}${text ? '&text=' + text : ''}&op=${op}`;
      newState = { sl, tl, text, op, url: newUrl };
      break;
    default:
      throw new Error('operator is invalid');
  }
  return newState;
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dipatch] = useReducer(reducer, initAppState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dipatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
