import { IpcChannelInterface, SuccessfulIpcResponse } from '../interfaces';
import IpcResponse from '../IPC/IpcResponse';

const successResponse = (
  ipcChannel: IpcChannelInterface,
  message: string,
  data: object
): SuccessfulIpcResponse => {
  const response = new IpcResponse({
    ipcChannel,
    status: 'success',
    message,
    data,
  }) as SuccessfulIpcResponse;

  return response;
};

export default successResponse;
