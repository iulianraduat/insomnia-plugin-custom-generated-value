export interface StoreContext {
  all(): Promise<Array<{
    key: string;
    value: string;
  }>>;
  clear(): Promise<void>;
  getItem(key: string): Promise<string>;
  hasItem(key: string): Promise<boolean>;
  removeItem(key: string): Promise<void>;
  setItem(key: string, value: string): Promise<void>;
}
