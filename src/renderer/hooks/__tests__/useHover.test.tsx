import { fireEvent, renderHook } from '@testing-library/react';

import useHover from '../useHover';

describe('useHover test', () => {
  it('toggles', () => {
    const ref = {
      current: document.createElement('div'),
    };
    const { result } = renderHook(() => useHover(ref));
    expect(result.current).toBe(false);
    fireEvent.mouseEnter(ref.current);
    expect(result.current).toBe(true);
    fireEvent.mouseLeave(ref.current);
    expect(result.current).toBe(false);
  });
});
