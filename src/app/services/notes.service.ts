import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Note {
  id: number;
  title: string;
  content: string;
  modified: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[];
  private nextId = 0;
  private notesBS = new BehaviorSubject<Note[]>([]);

  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    for (const note of this.notes) {
      if (note.id >= this.nextId) {
        this.nextId = note.id + 1;
      }
    }
    this.update();
  }

  subscribe() {
    return this.notesBS.asObservable();
  }

  subscribeFilter(observer: Observer<Note[]>, key: string) {
    return this.notesBS.subscribe(observer => {
      pipe(map(data => observer.filter((note) => {
        return (note.title.toLowerCase().includes(key.toLowerCase()) || note.content.toLowerCase().includes(key.toLowerCase()));
      })))
    });
          // });))});

  }

  addNote(title: string, text: string): Note {
    const note = {
      id: this.nextId++,
      title,
      content: text,
      modified: new Date(),
    };
    this.notes.push(note);
    this.update();
    return note;
  }

  getNote(id: number): Note {
    const index = this.findIndex(id);
    return this.notes[index];
  }

  updateNote(id: number, title: string, text: string) {
    const index = this.findIndex(id);
    this.notes[index] = { id, title, content: text, modified: new Date() };
    this.update();
  }

  deleteNote(id: number) {
    const index = this.findIndex(id);
    this.notes.splice(index, 1);
    this.update();
  }

  private update() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.notesBS.next(
      this.notes.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        modified: note.modified,
      }))
    );
  }

  private findIndex(id: number): number {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        return i;
      }
    }
    throw new Error(`Note with id ${id} was not found!`);
  }
}
