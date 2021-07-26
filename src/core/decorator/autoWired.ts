import 'reflect-metadata';
import { getSingleton, setSingleton } from '../singleton';

type ClassConstructor<T = any> = new (...args: any[]) => T;

/**
 * 单
 * @param Service
 * @constructor
 */
export const AutoWired: <T extends new (...args: any[]) => any>(Service: T) => PropertyDecorator = (Service) => {
  return (target, propertyKey) => {
    // 单例
    let instance = getSingleton(Service);
    if (instance) {
      (target as any)[propertyKey] = instance as Object;
    } else {
      instance = new Service();
      setSingleton(Service, instance);
    }
    Object.defineProperty(target, propertyKey, {
      get() {
        return instance;
      },
    });
  };
};

export const Component: ClassDecorator = (Target) => {
  const Factory: any = function () {
    const providers = Reflect.getMetadata('design:paramtypes', Target);
    const args = providers.map((provider: ClassConstructor) => new provider());
    return new (Target as any)(...args) as typeof Target;
  };
  return Factory;
};
