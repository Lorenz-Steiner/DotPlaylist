import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../playlist.service";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(public service: PlaylistService) { }

  ngOnInit(): void {
  }

}
