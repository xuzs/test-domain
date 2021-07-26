import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';

import { useAutoWired } from '@/core/hooks/useAutoWired';
import EventBusService from '../service/eventBusService';

const ReduxProvider: React.FC<{ children: React.ElementType }> = ({ children }) => {
  useEffect(() => {
    const eventBusService = useAutoWired(EventBusService);

    eventBusService.on('', (_data) => {
      // TODO SOMETHING
      // store.dispatch();
    });

    return () => {
      eventBusService.removeAllListeners();
    };
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
