import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { filterBoolean } from "../helpers/helper";
import { Resource } from "../types";

@Component({
  selector: "app-start-page",
  templateUrl: `./start-page.component.html`,
  styleUrls: ["./start-page.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent implements OnInit {
  public resources: Resource[] = [Resource.People, Resource.Starships];
  public resource: Resource = Resource.People;
  public resourceControl = new FormControl<Resource | null>(Resource.People);

  private destroy$: Subject<void> = new Subject();

  constructor(private cdRef: ChangeDetectorRef, private router: Router) {}

  public ngOnInit() {
    this.resourceControl.valueChanges
      .pipe(filterBoolean(), takeUntil(this.destroy$))
      .subscribe((resource) => {
        this.resource = resource!;
        this.cdRef.detectChanges;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToGame() {
    this.router.navigate(["/game", this.resource]);
  }
}
