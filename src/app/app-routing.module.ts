import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GamePageComponent } from "./game-page/game-page.component";
import { StartPageComponent } from "./start-page/start-page.component";

const routes: Routes = [
  { path: "", component: StartPageComponent },
  { path: "game/:resource", component: GamePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
