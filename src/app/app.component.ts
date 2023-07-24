import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: `./app.component.html`,
  styleUrls: ["./app.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private cdRef: ChangeDetectorRef) {}

  public onRouteActivated(): void {
    this.cdRef.detectChanges();
  }
}
