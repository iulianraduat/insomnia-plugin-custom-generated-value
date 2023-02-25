export interface AppContext {
  alert: (title: string, message?: string) => ReturnType<typeof showAlert>;
  clipboard: AppClipboard;
  dialog: (title: string, body: HTMLElement, options?: DialogOptions) => void;
  getInfo: () => AppInfo;
  getPath: (name: 'desktop' | string) => string;
  prompt: (
    title: string,
    options?: Pick<PromptModalOptions, 'label' | 'defaultValue' | 'submitName'>
  ) => Promise<string>;
  /**
   * @deprecated as it was never officially supported
   */
  showGenericModalDialog: (
    title: string,
    options?: ShowGenericModalDialogOptions
  ) => void;
  showSaveDialog: (options?: ShowDialogOptions) => Promise<string | null>;
}

// FIXME use the correct type
function showAlert(): string {
  return '';
}

interface AppClipboard {
  readText(): string;
  writeText(text: string): void;
  clear(): void;
}

interface PromptModalOptions {
  defaultValue: string;
  label: string;
  submitName: string;
}

interface DialogOptions {
  onHide?: () => void;
  skinny?: boolean;
  tall?: boolean;
  wide?: boolean;
}

interface AppInfo {
  platform: NodeJS.Platform;
  version: string;
}

interface ShowDialogOptions {
  defaultPath?: string;
}

interface AppClipboard {
  clear(): void;
  readText(): string;
  writeText(text: string): void;
}

interface ShowGenericModalDialogOptions {
  html?: string;
}
