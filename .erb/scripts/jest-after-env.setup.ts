import '@testing-library/jest-dom';

Object.assign(window, {
  electron: {
    store: {
      getState: jest.fn(),
      setState: jest.fn(),
      subscribe: jest.fn(),
    },
    ipc: {
      send: jest.fn(),
    },
  },
});
