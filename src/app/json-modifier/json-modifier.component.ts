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

  notAssignable: string[] = ["\u00fc", "\u00e4", "\u00f6", " ", "/", "\u00df", "\u00dc"];
  nameCorrect: string[] = new Array(this.arr.length);
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
        this.arr = this.playlist.cliplist;

        for(let i = 0; i < this.arr.length; i++){
          for(let j = 0; j < this.notAssignable.length; j++){
            if(this.arr[i].split('.')[0].indexOf(this.notAssignable[j]) > -1){
              this.nameCorrect[i] = "Name CORRUPTED and CORRECTED!";
              this.arr[i] = this.replaceUmlaute(this.arr[i]);
            }
          }
        }
      }
      let el = document.getElementById("items");
      // @ts-ignore
      let sort = Sortable.create(el, {animation: 150});
      this.sortable = sort;
      // save initial order
      let initialOrder = this.sortable.toArray();
    }
  }

  replaceUmlaute(str: string) {
    let value = str.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/Ö/g, 'oe');
    value = value.replace(/Ü/g, 'oe');
    value = value.replace(/Ä/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    value = value.replace(/ß/g, 'ss');
    value = value.replace(/ /g, '-');
    value = value.replace(/,/g, '');
    value = value.replace(/\(/g, '');
    value = value.replace(/\)/g, '');
    return value;
  }

  onSave(){
    document.getElementsByName("clips").forEach((element, index) => {

      // @ts-ignore
      this.playlist.cliplist[index] = document.getElementsByTagName("input").item(index).value
    })


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
