import { fireEvent, renderHook } from '@testing-library/react';

import useEventListener from '../useEventListener';

describe('useEventListener test', () => {
  it('should add event listener', () => {
    const mockEffect = jest.fn();

    const { rerender } = renderHook(() =>
      useEventListener('click', mockEffect)
    );

    expect(mockEffect).toHaveBeenCalledTimes(0);
    rerender();
    fireEvent.click(document);
    expect(mockEffect).toHaveBeenCalledTimes(1);
  });

  it('should remove event listener', () => {
    const mockEffect = jest.fn();

    const { rerender, unmount } = renderHook(() =>
      useEventListener('click', mockEffect)
    );

    fireEvent.click(document);

    expect(mockEffect).toHaveBeenCalledTimes(1);
    rerender();
    expect(mockEffect).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.click(document);

    expect(mockEffect).toHaveBeenCalledTimes(1);
  });
});
