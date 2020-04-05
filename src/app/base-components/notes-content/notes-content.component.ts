import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-notes-content',
  templateUrl: './notes-content.component.html',
  styleUrls: ['./notes-content.component.scss']
})
export class NotesContentComponent implements OnInit {
  @ViewChild(MatSidenav)
  private msn: MatSidenav;
  notes = [{
    name: "Note 1",
    content: "This is note 1",
    updated: new Date()
  },
    {
      name: "Note 2",
      content: "This is Note 2",
      updated: new Date()
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.msn.toggle();
  }

}
