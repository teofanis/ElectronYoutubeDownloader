import { IpcRequest } from 'interfaces';

export interface IpcServiceI {
  send: <T>(channel: string, request: IpcRequest) => Promise<T>;
}
