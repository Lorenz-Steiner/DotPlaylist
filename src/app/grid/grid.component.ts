import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../playlist.service";

import Sortable from 'sortablejs';
import {MultiDrag} from "sortablejs";
Sortable.mount(new MultiDrag());


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(public gridService: PlaylistService) { }

  ngOnInit(): void {

    let el = document.getElementById("items");
    // @ts-ignore
    new Sortable.create(el, {
      selectedClass: "sel",
      multiDrag: true,
      multiDragKey: null,
      avoidImplicitDeselect: false,
      animation: 150,
      fallbackTolerance: 3
    });
  }
}
