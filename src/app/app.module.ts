import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsonModifierComponent } from './json-modifier/json-modifier.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import { CompactComponent } from './compact/compact.component';
import { HelpComponent } from './help/help.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
  {path: 'home', component: JsonModifierComponent},
  {path: 'compact', component: CompactComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
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
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
