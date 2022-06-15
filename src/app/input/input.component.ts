import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../playlist.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor(public service: PlaylistService) { }
  ngOnInit(): void {
  }

  onFileUpload(event: Event){
    event.preventDefault();
    this.service.getFile(event);
    console.log(this.service.playlistFileName);
    console.log(this.service.playlist.name);
  }
}
