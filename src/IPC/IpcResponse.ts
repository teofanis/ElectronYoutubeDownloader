import {
  IpcResponse as IpcResponseI,
  IpcResponseArgs,
  IpcResponseBody,
} from '../interfaces';

export default class IpcResponse implements IpcResponseI {
  responder: string;

  response: IpcResponseBody;

  constructor(args: IpcResponseArgs) {
    const { ipcChannel, status, message, data } = args;
    this.responder = ipcChannel.getName();
    this.response = {
      status,
      message,
      data,
    };
  }
}
