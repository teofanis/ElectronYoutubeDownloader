import { Selector } from 'interfaces/Store';
import { useEffect, useState } from 'react';
import { StoreShape } from '../../main/store';

export default function useStore(
  selector: Selector,
  initialState: ReturnType<Selector> | null = null
) {
  // TODO: Be smarter about this
  const [currentState, setCurrentState] = useState(initialState);
  useEffect(() => {
    window.electron.store.subscribe<StoreShape>((state) => {
      setCurrentState(selector(state));
    });
  }, [selector]);
  return currentState;
}
