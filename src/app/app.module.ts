import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { NgxSpinnerModule } from "ngx-spinner";
import {
  faSpellCheck,
  faFont,
  faAtom,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { ExitDetailsGuard } from "./exit.details.guard";

import { AppComponent } from "./app.component";
import { LogoListComponent } from "./logo-list/logo-list.component";
import { LogoDetailsComponent } from "./logo-details/logo-details.component";
import { LogoEditComponent } from "./logo-details/logo-edit/logo-edit.component";
import { EditTextComponent } from "./logo-details/logo-edit/edit-text/edit-text.component";
import { EditFontComponent } from "./logo-details/logo-edit/edit-font/edit-font.component";
import { EditImgComponent } from "./logo-details/logo-edit/edit-img/edit-img.component";
import { SwitchEditorComponent } from "./logo-details/logo-edit/switch-editor/switch-editor.component";
import { HeaderListComponent } from "./logo-list/header-list/header-list.component";
import { HeaderDetailsComponent } from "./logo-details/header-details/header-details.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: "", component: LogoListComponent },
      {
        path: ":logoId",
        component: LogoDetailsComponent,
        canDeactivate: [ExitDetailsGuard]
      }
    ])
  ],
  declarations: [
    AppComponent,
    LogoListComponent,
    LogoDetailsComponent,
    LogoEditComponent,
    EditTextComponent,
    EditImgComponent,
    EditFontComponent,
    SwitchEditorComponent,
    HeaderDetailsComponent,
    HeaderListComponent
  ],
  providers: [ExitDetailsGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faSpellCheck, faFont, faAtom, faChevronDown);
  }
}
