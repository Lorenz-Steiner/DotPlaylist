import {Component, Input, OnInit, Output} from '@angular/core';
import {Playlist} from "../playlist";
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import {animate} from "@angular/animations";

@Component({
  selector: 'app-json-modifier',
  templateUrl: './json-modifier.component.html',
  styleUrls: ['./json-modifier.component.css']
})
export class JsonModifierComponent implements OnInit {

  playlist: Playlist = new Playlist();
  sortable?:Sortable;

  constructor() {

  }

  ngOnInit(): void {

  }

  onFileUpload(event: Event){

    // @ts-ignore
    let file:File = event.target.files[0];

    if(file){
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = () => {
        // @ts-ignore
        this.playlist = (JSON.parse(fileReader.result.toString()));
      }
      let el = document.getElementById("items");
      // @ts-ignore
      let sort = Sortable.create(el, {animation: 150});
      this.sortable = sort;
      // save initial order
      let initialOrder = this.sortable.toArray();

    }
  }

  onClick(){
    // @ts-ignore
    this.sortable?.toArray();
    console.log(this.sortable?.toArray());
  }

  onExport(){
    var sJson = JSON.stringify(this.playlist);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', this.playlist.name + ".playlist");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }


}
