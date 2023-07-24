import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Resource, ResourceItem } from "src/app/types";

@Component({
  selector: "result-item",
  templateUrl: `./result-item.components.html`,
  styleUrls: ["./result-item.components.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultItemComponent {
  @Input() resource: Resource = Resource.People;
  @Input() item: ResourceItem | null = null;
  @Input() header: string = "";

  public Resource: typeof Resource = Resource;
}
