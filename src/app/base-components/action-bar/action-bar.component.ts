import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {

  @Output() sideToggle = new EventEmitter();

  value = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void{
    this.sideToggle.emit();
  }
  deleteNote(): void {

  }
  addNote(): void {

  }

}
