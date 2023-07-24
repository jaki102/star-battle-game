import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "card",
  templateUrl: `./card.component.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
