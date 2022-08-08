import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../playlist.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public service: PlaylistService) { }

  ngOnInit(): void {
  }

  onExport(){
    this.service.onSave();
    this.service.onExport();
  }

  saveOrder(){
    this.service.onSave();
  }
}
