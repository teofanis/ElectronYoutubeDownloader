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
  ...args: unknown[]
): IpcRequest => {
  const request = {
    params: args,
  } as IpcRequest;
  if (responseChannel) {
    request.responseChannel = responseChannel;
  }
  return request;
};

// TODO: Extract CHANNEL STRINGs to a constant file and type them
const useIpc = (channel: string) => {
  const { ipc } = useAppContext();

  function send<T>(...args: unknown[]) {
    const request = prepareRequest(null, ...args);
    const response = ipc.send<T>(channel, request);
    return response;
  }

  return { ipc, send };
};
export { AppProvider, useIpc, useAppContext };
