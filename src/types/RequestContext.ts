type EnvironmentVariable = string | number | boolean | Record<string, any> | any[] | null

export interface RequestContext {
  addHeader(name: string, value: string): void;
  addParameter(name: string, value: string): void;
  getAuthentication(): RequestAuthentication;
  getBody(): RequestBody;
  getEnvironment(): Record<string, EnvironmentVariable>;
  getEnvironmentVariable(name: string): EnvironmentVariable;
  getHeader(name: string): string | null;
  getHeaders(): Array<{ name: string; value: string }>;
  getId(): string;
  getMethod(): string;
  getName(): string;
  getParameter(name: string): string | null;
  getParameters(): Array<{ name: string, value: string }>;
  getUrl(): string;
  hasHeader(name: string): boolean;
  hasParameter(name: string): boolean;
  removeHeader(name: string): void;
  removeParameter(name: string): void;
  setAuthenticationParameter(name: string, value: string): void;
  setBody(body: RequestBody): void;
  setCookie(name: string, value: string): void;
  setHeader(name: string, value: string): void;
  setMethod(method: string): void;
  setParameter(name: string, value: string): void;
  settingDisableRenderRequestBody(enabled: boolean): void;
  settingEncodeUrl(enabled: boolean): void;
  settingFollowRedirects(enabled: 'global' | 'on' | 'off'): void;
  settingSendCookies(enabled: boolean): void;
  settingStoreCookies(enabled: boolean): void;
  setUrl(url: string): void;
}

type RequestAuthentication = Record<string, any>;

interface RequestBody {
  fileName?: string;
  mimeType?: string | null;
  params?: Array<RequestBodyParameter>;
  text?: string;
}

interface RequestBodyParameter {
  description?: string;
  disabled?: boolean;
  fileName?: string;
  id?: string;
  multiline?: string;
  name: string;
  type?: string;
  value: string;
}
