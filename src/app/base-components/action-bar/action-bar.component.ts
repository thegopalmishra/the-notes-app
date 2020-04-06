import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Output() sideToggle = new EventEmitter();
  @Output() viewToggle = new EventEmitter<boolean>();
  @Output() freezeToggle = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  @Output() newNote = new EventEmitter();
  @Output() delNote = new EventEmitter();

  searchValue = '';
  listView = true;
  noFreeze = true;
  isNoteSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void{
    this.sideToggle.emit();
  }
  deleteNote(): void {
    this.delNote.emit();
  }
  addNote(): void {
    this.newNote.emit();
  }
  toggleView(): void{
    this.listView = !this.listView;
    this.viewToggle.emit(!this.listView);
  }
  toggleFreeze(): void {
    this.noFreeze = !this.noFreeze;
    this.freezeToggle.emit(!this.noFreeze);
  }
  searchNotes(): void{
    this.search.emit(this.searchValue);
  }
  noteSelected(isSelected): void{
    console.log('notified')
    this.isNoteSelected = isSelected;
  }

}
