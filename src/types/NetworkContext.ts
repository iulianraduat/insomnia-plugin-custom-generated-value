export interface NetworkContext {
  sendRequest(request: Request, extraInfo?: ExtraRenderInfo): Promise<any>;
}

type Request = BaseModel & BaseRequest;

interface BaseModel {
  _id: string;
  type: string;
  // TSCONVERSION -- parentId is always required for all models, except 4:
  //   - Stats, Settings, and Project, which never have a parentId
  //   - Workspace optionally has a parentId (which will be the id of a Project)
  parentId: string; // or null
  modified: number;
  created: number;
  isPrivate: boolean;
  name: string;
}

interface BaseRequest {
  url: string;
  name: string;
  description: string;
  method: string;
  body: RequestBody;
  parameters: RequestParameter[];
  headers: RequestHeader[];
  authentication: RequestAuthentication;
  metaSortKey: number;
  isPrivate: boolean;
  // Settings
  settingStoreCookies: boolean;
  settingSendCookies: boolean;
  settingDisableRenderRequestBody: boolean;
  settingEncodeUrl: boolean;
  settingRebuildPath: boolean;
  settingFollowRedirects: 'global' | 'on' | 'off';
}

interface RequestBody {
  mimeType?: string | null;
  text?: string;
  fileName?: string;
  params?: RequestBodyParameter[];
}

interface RequestBodyParameter {
  name: string;
  value: string;
  description?: string;
  disabled?: boolean;
  multiline?: string;
  id?: string;
  fileName?: string;
  type?: string;
}

interface RequestParameter {
  name: string;
  value: string;
  disabled?: boolean;
  id?: string;
  fileName?: string;
}

interface RequestHeader {
  name: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

type RequestAuthentication = Record<string, any>;

type ExtraRenderInfo = {
  name: string;
  value: any;
}[];
