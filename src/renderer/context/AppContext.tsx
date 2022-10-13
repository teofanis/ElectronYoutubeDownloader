import { IpcRequest } from 'interfaces';
import { createContext, useContext } from 'react';

const initialState = {
  ipc: window.electron.ipc,
};
const AppContext = createContext(initialState);

interface AppProviderProps {
  children: React.ReactNode;
  ipc: Window['electron']['ipc'];
}

const AppProvider = ({ children, ipc }: AppProviderProps) => {
  return <AppContext.Provider value={{ ipc }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext hook was used outside of the AppProvider');
  }
  return context;
};

const prepareRequest = (
  responseChannel: string | null | undefined,
  action: string,
  payload: unknown
): IpcRequest => {
  const request = {
    action,
    payload,
  } as IpcRequest;
  if (responseChannel) {
    request.responseChannel = responseChannel;
  }
  return request;
};

// TODO: Extract CHANNEL STRINGs to a constant file and type them
const useIpc = (channel: string) => {
  const { ipc } = useAppContext();

  function send<T>(action: string, payload: unknown) {
    const request = prepareRequest(null, action, payload);
    const response = ipc.send<T>(channel, request);
    return response;
  }

  return { ipc, send };
};

export { AppProvider, useIpc, useAppContext };
