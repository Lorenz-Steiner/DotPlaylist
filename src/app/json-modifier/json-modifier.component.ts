import {Component, Input, OnInit, Output} from '@angular/core';
import {Playlist} from "../playlist";
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import {animate} from "@angular/animations";
import {colors} from "@angular/cli/utilities/color";

@Component({
  selector: 'app-json-modifier',
  templateUrl: './json-modifier.component.html',
  styleUrls: ['./json-modifier.component.css']
})
export class JsonModifierComponent implements OnInit {

  playlist: Playlist = new Playlist();
  arr: string[] = [];

  file: {
    fileName: string;
    fileExtension: string;
    id: number;
  }[] = [];

  filename: string[] = [];
  fileExtension: string[] = [];
  sortID: string[] = [];

  listitems: HTMLLIElement [] = [];

  notAssignable: string[] = ["\u00fc", "\u00e4", "\u00f6", " ", "/", "\u00df", "\u00dc"];
  nameCorrect: string[] = new Array(this.arr.length);
  sortable?:Sortable;

  constructor() {

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
    // @ts-ignore
    let file:File = event.target.files[0];
    if(file){
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = () => {
        // @ts-ignore
        this.playlist = (JSON.parse(fileReader.result.toString()));
        for(let i = 0; i < this.playlist.cliplist.length; i++){
          //this.file[i].fileName = this.playlist.cliplist[i].split(".")[0];
          //this.file[i].fileExtension = this.playlist.cliplist[i].split(".")[this.playlist.cliplist[i].split(".").length-1];
          //this.file[i].id = i;

          this.filename[i] = this.playlist.cliplist[i].split(".")[0];
          this.fileExtension[i] = this.playlist.cliplist[i].split(".")[this.playlist.cliplist[i].split(".").length-1];
        }
        this.findUmalaute();
      }

    }
  }

  findUmalaute(){
    for(let i = 0; i < this.filename.length; i++){
      for(let j = 0; j < this.notAssignable.length; j++){
        if(this.filename[i].split('.')[0].indexOf(this.notAssignable[j]) > -1){
          this.nameCorrect[i] = "Name CORRUPTED!";
        }
      }
    }
  }

  onSave(){
    for(let i = 0; i < this.playlist.cliplist.length; i++){
      // @ts-ignore
      this.playlist.cliplist[i] = document.getElementsByName("files")[i].value + "." + this.fileExtension[i];
    }
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
