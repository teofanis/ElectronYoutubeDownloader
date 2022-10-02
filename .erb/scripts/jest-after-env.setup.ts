import '@testing-library/jest-dom';

Object.assign(window, {
  electron: {
    ipcRenderer: {
      on: jest.fn(),
      sendMessage: jest.fn(),
      removeAllListeners: jest.fn(),
    },
  },
});
