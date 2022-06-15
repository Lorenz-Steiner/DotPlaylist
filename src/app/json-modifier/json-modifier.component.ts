import {Component, Input, OnInit, Output} from '@angular/core';
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import {PlaylistService} from "../playlist.service";


@Component({
  selector: 'app-json-modifier',
  templateUrl: './json-modifier.component.html',
  styleUrls: ['./json-modifier.component.css']
})
export class JsonModifierComponent implements OnInit {


  constructor(public service: PlaylistService) {

  }

  ngOnInit(): void {
    let el = document.getElementById("items");
    // @ts-ignore
    this.sortable = Sortable.create(el, {
      selectedClass: "sel",
      multiDrag: true,
      multiDragKey: 'CTRL',
      avoidImplicitDeselect: false,
      animation: 150,
      fallbackTolerance: 3,
      handle: '.icon-move'
    });
  }

}
