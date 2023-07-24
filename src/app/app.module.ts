import { NgModule } from "@angular/core";
import { NgxsModule, NoopNgxsExecutionStrategy } from "@ngxs/store";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ResourceItemState } from "./state/resource-item.state";
import { GamePageComponent } from "./game-page/game-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StartPageComponent } from "./start-page/start-page.component";
import { ResourcesState } from "./state/resources.state";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { ResultItemComponent } from "./components/result-item/result-item.components";
import { CardComponent } from "./components/card/card.component";

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    GamePageComponent,
    ResultItemComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([ResourceItemState, ResourcesState], {
      executionStrategy: NoopNgxsExecutionStrategy,
    }),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
