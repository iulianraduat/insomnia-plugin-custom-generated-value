import { MetaContext } from './MetaContext';

export type EnvVariableValue = string | string[] | any;

export type RenderPurpose = 'send' | 'general' | 'no-render';

export interface RenderContext extends Record<string, EnvVariableValue> {
  activityDate: string;
  getEnvironmentId(): string;
  getExtraInfo(key: string): EnvVariableValue | null;
  getKeysContext(): { keyContext: Record<string, string> };
  getMeta(): MetaContext;
  getProjectId(): string | undefined;
  getPurpose: () => RenderPurpose | undefined;
}
