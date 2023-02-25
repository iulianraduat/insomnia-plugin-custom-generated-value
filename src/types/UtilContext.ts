export interface UtilContext {
  models: {
    cookieJar: {
      getOrCreateForWorkspace: Function
    },
    oAuth2Token: {
      getByRequestId: Function
    },
    request: {
      getAncestors: Function
      getById: Function;
    },
    response: {
      getBodyBuffer: Function;
      getLatestForRequestId: Function;
    },
    workspace: {
      getById: Function;
    },
  },
  render(d: any): any;
}