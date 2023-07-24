import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ResourceType } from "../types";
import { Injectable } from "@angular/core";
import { ResourcesService } from "../services/resource.service";
import { LoadAllResources } from "../actions/resources.actions";
import { tap } from "rxjs";

export class ResourcesStateModel {
  resources: ResourceType[] = [];
}

@State<ResourcesStateModel>({
  name: "resources",
  defaults: {
    resources: [],
  },
})
@Injectable()
export class ResourcesState {
  constructor(private resourcesService: ResourcesService) {}

  @Selector()
  static getResources(state: ResourcesStateModel) {
    return state.resources!;
  }

  @Action(LoadAllResources)
  load({ patchState }: StateContext<ResourcesStateModel>, { payload }: any) {
    return this.resourcesService.loadAllResources(payload.resource).pipe(
      tap((resources) => {
        patchState({
          resources: [...resources],
        });
      })
    );
  }
}
