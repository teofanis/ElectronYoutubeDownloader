import {
  ErrorIpcResponse,
  IpcChannelInterface,
  SuccessfulIpcResponse,
} from '../interfaces';
import IpcResponse from '../IPC/IpcResponse';

const errorResponse = (
  ipcChannel: IpcChannelInterface,
  message: string
): SuccessfulIpcResponse => {
  const response = new IpcResponse({
    ipcChannel,
    status: 'failure',
    message,
  }) as ErrorIpcResponse;

  return response;
};

export default errorResponse;
