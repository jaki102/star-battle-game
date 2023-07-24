import { Action, Selector, State, StateContext } from "@ngxs/store";
import {
  LoadResourceItem,
  ResetResourceItemState,
} from "../actions/resources.actions";
import { ResourcesService } from "../services/resource.service";
import { tap } from "rxjs";
import { Injectable } from "@angular/core";

interface ResourceItem {
  name: string;
  power: number;
}

export class ResourceItemStateModel {
  item: ResourceItem | null = null;
}

@State<ResourceItemStateModel>({
  name: "resourceItem",
  defaults: {
    item: null,
  },
})
@Injectable()
export class ResourceItemState {
  constructor(private resourcesService: ResourcesService) {}

  @Selector()
  static getResourceItem(state: ResourceItemStateModel) {
    return state.item;
  }

  @Action(LoadResourceItem, { cancelUncompleted: true })
  load({ patchState }: StateContext<ResourceItemStateModel>, { payload }: any) {
    return this.resourcesService.loadResourceItem(payload.url).pipe(
      tap((item) => {
        patchState({
          item,
        });
      })
    );
  }

  @Action(ResetResourceItemState)
  resetState({ patchState }: StateContext<ResourceItemStateModel>) {
    patchState({
      item: null,
    });
  }
}
