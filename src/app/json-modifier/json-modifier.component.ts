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
      animation: 150,
      handle: '.icon-move'
    });
  }

  onFileUpload(event: Event){
   this.service.getFile(event);
  }


  onSave(){
    this.service.onSave();
  }

  onExport(){
    this.service.onExport();
  }


}
