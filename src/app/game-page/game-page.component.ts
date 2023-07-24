import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  LoadAllResources,
  LoadResourceItem,
  ResetResourceItemState,
} from "../actions/resources.actions";
import { Store } from "@ngxs/store";
import { Subject, map, takeUntil, tap } from "rxjs";
import { ResourceType, ResourceItem, Resource } from "../types";
import { ActivatedRoute } from "@angular/router";
import { filterBoolean } from "../helpers/helper";
import { ResourcesState } from "../state/resources.state";
import { ResourceItemState } from "../state/resource-item.state";

@Component({
  selector: "app-game-page",
  templateUrl: `./game-page.component.html`,
  styleUrls: ["./game-page.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit {
  public playerOneItem: ResourceItem | null = null;
  public playerTwoItem: ResourceItem | null = null;
  public playerOneTurn: boolean = true;
  public playerOneResult: number = 0;
  public playerTwoResult: number = 0;
  public resource: Resource = Resource.People;

  private resources: ResourceType[] = [];
  private destroy$: Subject<void> = new Subject();

  constructor(
    private cdRef: ChangeDetectorRef,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route.paramMap
      .pipe(
        map((param) => param.get("resource")),
        filterBoolean(),
        tap((resource) => [
          this.store.dispatch(new LoadAllResources({ resource: resource! })),
          this.store.dispatch(new ResetResourceItemState()),
        ]),
        takeUntil(this.destroy$)
      )
      .subscribe((resource) => {
        this.resource = <Resource>resource;
        this.cdRef.detectChanges();
      });

    this.store
      .select(ResourcesState.getResources)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resources) => {
        this.resources = resources;
        this.cdRef.detectChanges();
      });

    this.store
      .select(ResourceItemState.getResourceItem)
      .pipe(filterBoolean(), takeUntil(this.destroy$))
      .subscribe((item) => {
        this.resolveResult(item!);
        if (this.playerOneItem && this.playerTwoItem)
          this.checkResults(this.playerOneItem.power, this.playerTwoItem.power);
        this.playerOneTurn = !this.playerOneTurn;
        this.cdRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getItem(): void {
    const resourcesLength = this.resources.length;
    if (!resourcesLength) return;
    const index = Math.floor(Math.random() * resourcesLength);
    this.store.dispatch(
      new LoadResourceItem({ url: this.resources[index].url })
    );
  }

  public resetGame(): void {
    this.playerOneItem = null;
    this.playerTwoItem = null;
    this.playerOneTurn = true;
    this.playerOneResult = 0;
    this.playerTwoResult = 0;
    this.store.dispatch(new ResetResourceItemState());
    this.cdRef.detectChanges();
  }

  private resolveResult(item: ResourceItem): void {
    if (this.playerOneTurn) {
      this.playerOneItem = item;
      this.playerTwoItem = null;
    } else {
      this.playerTwoItem = item;
    }
  }

  private checkResults(playerOneMass: number, playerTwoMass: number): void {
    if (playerOneMass === playerTwoMass) return;
    playerOneMass > playerTwoMass
      ? this.playerOneResult++
      : this.playerTwoResult++;
  }
}
