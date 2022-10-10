import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { IpcRequest, PromisedIpcResponse } from 'interfaces';
import App from '../renderer/App';

const ipc = {
  send<T>(channel: string, request: IpcRequest): PromisedIpcResponse<T> {
    console.log(channel, request);
    return Promise.resolve({} as PromisedIpcResponse<T>);
  },
};

describe('App', () => {
  it('should render', () => {
    expect(render(<App ipc={ipc} />)).toBeTruthy();
  });
});
