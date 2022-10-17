import { renderHook } from '@testing-library/react';

import useEffectOnce from '../useEffectOnce';

describe('useEffectOnce test', () => {
  it('should run once', () => {
    const mockEffect = jest.fn();

    const { rerender } = renderHook(() => useEffectOnce(mockEffect));

    expect(mockEffect).toHaveBeenCalledTimes(1);
    rerender();
    expect(mockEffect).toHaveBeenCalledTimes(1);
  });
});
