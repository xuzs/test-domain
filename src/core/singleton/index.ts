const map = new Map();

export const getSingleton = <T>(service: new (...args: any[]) => T): T => {
  return map.get(service);
};

export const setSingleton = (key: any, service: any) => {
  return map.set(key, service);
};
