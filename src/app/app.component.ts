import { Component, ViewChild } from '@angular/core';
import { NotesContentComponent } from './base-components/notes-content/notes-content.component';
import { ActionBarComponent } from './base-components/action-bar/action-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'thenotesapp';
  @ViewChild(NotesContentComponent)
  private nc: NotesContentComponent;
  @ViewChild(ActionBarComponent)
  private ab: ActionBarComponent;

  toggleSidebar(): void{
    this.nc.toggleSidebar();
  }
  newNote(): void {
    this.nc.addNewNote();
  }
  deleteNote(): void {
    this.nc.deleteNote();
  }
  toggleView(listView): void {
    this.nc.toggleNotesView(listView);
  }
  toggleFreeze(noFreeze): void {
    this.nc.toggleFreeze(noFreeze);
  }
  searchNotes(searchKey): void {
    this.nc.searchNotes(searchKey);
  }
  notifyNoteSelected(isSelected): void {
    console.log('notifying')
    this.ab.noteSelected(isSelected);
  }


}
