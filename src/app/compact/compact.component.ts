import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../playlist.service";
import Sortable from "sortablejs";

@Component({
  selector: 'app-compact',
  templateUrl: './compact.component.html',
  styleUrls: ['./compact.component.css']
})
export class CompactComponent implements OnInit {

  constructor(public compactService: PlaylistService) { }

  ngOnInit(): void {
    let el = document.getElementById("items");
    // @ts-ignore
    new Sortable.create(el, {
      group: 'grid',
      animation: 150
    })
  }
}
