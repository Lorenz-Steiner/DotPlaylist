import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../playlist.service";
import Sortable from "sortablejs";

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
      group: '',
      animation: 150
    })
  }

}