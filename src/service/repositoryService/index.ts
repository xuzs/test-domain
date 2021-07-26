import ServiceBasic from '../../core/serviceBasic';

export default class RepositoryService extends ServiceBasic {
  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const value = window.localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value) as any;
  }
}
