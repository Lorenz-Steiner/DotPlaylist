import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsonModifierComponent } from './json-modifier/json-modifier.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import { CompactComponent } from './compact/compact.component';
import { HelpComponent } from './help/help.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
  {path: 'home', component: JsonModifierComponent},
  {path: 'compact', component: CompactComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    JsonModifierComponent,
    HeaderComponent,
    CompactComponent,
    HelpComponent,
    InputComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
