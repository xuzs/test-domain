import { getSingleton, setSingleton } from '../singleton';
import { useState } from 'react';

export const useAutoWired = <T>(Service: new (...args: any[]) => T) => {
  const [service] = useState(() => {
    let instance = getSingleton(Service);
    if (!instance) {
      instance = new Service();
      setSingleton(Service, instance);
    }
    return instance;
  });
  return service;
};
