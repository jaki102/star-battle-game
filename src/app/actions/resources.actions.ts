export class LoadResourceItem {
  static readonly type = "[ResourceItem] Load";

  constructor(public payload: { url: string }) {}
}

export class ResetResourceItemState {
  static readonly type = "[ResourceItem] Reset";
}

export class LoadAllResources {
  static readonly type = "[Resources] Load";

  constructor(public payload: { resource: string }) {}
}
