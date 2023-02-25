export interface TemplateTag {
  actions?: Array<{
    name: string;
    icon?: string;
    run?: (context: any) => Promise<void>;
  }>;
  args: Array<{
    defaultValue: string | number | boolean;
    description?: string;
    displayName: string;
    // Only type === 'enum'
    options?: Array<{
      displayName: string;
      value: string;
      description?: string;
      placeholder?: string;
    }>;
    // Only type === 'model'
    modelType?: string;
    // Only type === 'string'
    placeholder?: string;
    type: 'string' | 'number' | 'enum' | 'model' | 'boolean';
  }>;
  deprecated?: boolean;
  description?: string;
  disablePreview?: () => boolean;
  displayName: string;
  liveDisplayName?: (args: any) => string | undefined;
  name: string;
  priority?: number;
  run(context: any, ...args: Array<any>): Promise<any>;
  validate?: (value: any) => string | undefined;
};