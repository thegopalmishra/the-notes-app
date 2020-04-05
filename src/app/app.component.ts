import { Component, ViewChild } from '@angular/core';
import { NotesContentComponent } from './base-components/notes-content/notes-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'thenotesapp';
  @ViewChild(NotesContentComponent)
  private nc: NotesContentComponent;

  toggleSidebar(): void{
    this.nc.toggleSidebar();
  }
}
