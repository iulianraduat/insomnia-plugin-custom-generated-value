import { RequestContext } from "./RequestContext";
import { StoreContext } from "./StoreContext";

export interface RequestHook {
  app: any;
  data: any;
  network: any;
  request: RequestContext;
  store: StoreContext;
}
