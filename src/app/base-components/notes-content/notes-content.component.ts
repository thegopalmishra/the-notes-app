import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NotesService, Note } from 'src/app/services/notes.service';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notes-content',
  templateUrl: './notes-content.component.html',
  styleUrls: ['./notes-content.component.scss']
})
export class NotesContentComponent implements OnInit {
  @ViewChild(MatSidenav)
  private msn: MatSidenav;
  @Output() noteSelected = new EventEmitter<boolean>();
  public showNoteContainer = false;
  public currentNote: Note;
  public editMode: boolean;
  public newMode: boolean;
  noteTitle: string;
  noteContent: string;
  notes: Note[] = [];
  // notesBackup = new BehaviorSubject<Note[]>([]);
  notesBackup: Note[] = [];

  // notes = [{
  //   name: 'Note 1',
  //   content: 'This is note 1',
  //   updated: new Date()
  // },
  //   {
  //     name: 'Note 2',
  //     content: 'This is Note 2',
  //     updated: new Date()
  //   }
  // ];

  constructor(private ns: NotesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.ns.subscribe(this.notes);
    this.ns.subscribe().subscribe((arg) => {this.notes = arg; this.notesBackup = arg; });

    // this.ns.subscribe(this.notesBackup);

    // }
    // this.editNoteForm = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   text: ['', Validators.required]
    // });
  }

  notify(message: string, action: string, timeout: number): void{
    timeout = (timeout > 1000) ? timeout : 2000;
    this.snackBar.open(message, action, {
      duration: timeout,
    });
  }
  toggleSidebar(): void {
    this.msn.toggle();
  }
  toggleNotesView(listView): void {
    if (listView) {
      this.notify('Layout Changed To Grid', 'Got It!', 2000);
    }
    else {
      this.notify('Layout Changed To List', 'Got It!', 2000);
    }
  }

  toggleFreeze(noFreeze): void {
    if (noFreeze) {
      this.notify('Panes Frezeed', 'Got It!', 2000);
    }
    else {
      this.notify('Panes Unfreezed', 'Got It!', 2000);
    }
  }

  clearInputs(): void{
    this.noteTitle = this.noteContent = '';
  }
  addNewNote(): void {
    console.log('Adding New Note');
    this.showNoteContainer = true;
    this.clearInputs();
    this.newMode = true;
  }

  selectNote(id: number): void {
    this.editMode = true;
    this.newMode = false;
    this.showNoteContainer = true;
    this.currentNote = this.ns.getNote(id);
    this.noteTitle = this.currentNote.title;
    this.noteContent = this.currentNote.content;
    this.onNoteSelect();
  }

  onNoteSelect(): boolean {
    this.noteSelected.emit(this.currentNote.id >= 0);
    console.log('emitting', this.currentNote.id );
    return this.currentNote.id >= 0;
  }

  deleteNote(): void {
    console.log('Deleting Note');
    this.notify('Note Deleted.', 'Got It!', 2000);
    this.showNoteContainer = false;
    this.editMode = false;
    this.newMode = false;
    if (this.currentNote.id < 0) { return; }
    this.ns.deleteNote(this.currentNote.id);
    this.currentNote = { id: -1, title: '', content: '', modified: new Date(null) };
    this.onNoteSelect();
  }

  editNote(): void {
    // if (this.currentNote.id < 0) return;
    // this.editNoteForm.get('title').setValue(this.currentNote.title);
    // this.editNoteForm.get('text').setValue(this.currentNote.text);
    // this.createNote = false;
  }

  updateNote(): void {
    // if (!this.editNoteForm.valid) return;
    debugger;
    if (this.newMode) {
      this.currentNote = this.ns.addNote(this.noteTitle, this.noteContent);
      this.newMode = false;
      this.editMode = false;
    } else {
      const noteTitle = this.noteTitle;
      const noteContent = this.noteContent;
      const id = this.currentNote.id;
      this.ns.updateNote(id, noteTitle, noteContent);
      this.currentNote = { id, title: noteTitle, content: noteContent, modified: new Date() };
    }
    this.notesBackup = this.notes;
    // this.editNote = false;
  }

  searchNotes(key) {
    console.log(key);

    this.notes = this.notesBackup.filter((note) => {
      console.log(note);

      return (
          note.title.toLowerCase().includes(key.toLowerCase()) ||
          note.content.toLowerCase().includes(key.toLowerCase())
      );
    });


  }


  }
