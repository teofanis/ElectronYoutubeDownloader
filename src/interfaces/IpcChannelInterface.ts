import { IpcMainEvent } from 'electron';

export interface IpcChannelInterface {
  getName(): string;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}

export interface IpcRequest {
  responseChannel?: string;
  action: string;
  payload: unknown;
}

export type IpcResponseType = 'success' | 'failure';
export type IpcResponseBody = {
  status: IpcResponseType;
  message?: string;
  data?: object;
};

export type PromisedIpcResponse<T> = Promise<
  {
    response: {
      data?: T;
    } & IpcResponseBody;
  } & IpcResponse
>;

type SuccessfulResponseBody = {
  status: 'success';
} & IpcResponseBody;

type ErrorResponseBody = {
  status: 'error';
  message: string;
} & IpcResponseBody;

export type IpcResponseArgs = {
  ipcChannel: IpcChannelInterface;
} & IpcResponseBody;

export interface IpcResponse {
  responder: string;
  response: IpcResponseBody;
}

export interface SuccessfulIpcResponse extends IpcResponse {
  response: SuccessfulResponseBody;
}

export interface ErrorIpcResponse extends IpcResponse {
  response: ErrorResponseBody;
}
