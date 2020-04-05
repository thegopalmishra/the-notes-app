import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionBarComponent } from './base-components/action-bar/action-bar.component';
import { SideBarComponent } from './base-components/side-bar/side-bar.component';
import { NotesEditComponent } from './base-components/notes-edit/notes-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionBarComponent,
    SideBarComponent,
    NotesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
