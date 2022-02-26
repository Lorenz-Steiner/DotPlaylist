import { Injectable, Component } from '@angular/core';
import {Playlist} from "./playlist";
import Sortable from "sortablejs";
import {Event} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlist: Playlist = new Playlist();

  files:File[] =[];
  current: boolean = false;

  filename: string[] = [];
  fileExtension: string[] = [];

  notAssignable: string[] = ["\u00fc", "\u00e4", "\u00f6", " ", "/", "\u00df", "\u00dc"];
  nameCorrect: string[] = [];
  sortable?:Sortable;



  getFile(event: EventInit){
    // @ts-ignore
    if(event.target.files[0].name.split(".").pop() === "playlist"){
      // @ts-ignore
      this.files = event.target.files;
      if(this.files){
        let playlistFile: File = (this.files)[0];
        if(this.current) {
          if (confirm("Do you want to replace the current .playlist?")) {
            const fileReader = new FileReader();
            fileReader.readAsText(playlistFile, "UTF-8");
            fileReader.onload = () => {
              // @ts-ignore
              this.playlist = (JSON.parse(fileReader.result.toString()));
              for (let i = 0; i < this.playlist.cliplist.length; i++) {
                this.filename[i] = this.playlist.cliplist[i].split(".")[0];
                this.fileExtension[i] = this.playlist.cliplist[i].split(".")[this.playlist.cliplist[i].split(".").length - 1];
              }
              this.current = true;
              this.findUmalaute();
            }
          }else{
            return;
          }
        }else {
          let playlistFile: File = (this.files)[0];
          const fileReader = new FileReader();
          fileReader.readAsText(playlistFile, "UTF-8");
          fileReader.onload = () => {
            // @ts-ignore
            this.playlist = (JSON.parse(fileReader.result.toString()));
            for (let i = 0; i < this.playlist.cliplist.length; i++) {
              this.filename[i] = this.playlist.cliplist[i].split(".")[0];
              this.fileExtension[i] = this.playlist.cliplist[i].split(".")[this.playlist.cliplist[i].split(".").length - 1];
            }
            this.current = true;
            this.findUmalaute();
          }
        }
      }
    }else{
      if(this.current){
        // @ts-ignore
        this.files = event.target.files;
        for(let i = 0; i < this.files.length; i++){
          this.filename.push((this.files)[i].name.split(".")[0]);
          // @ts-ignore
          this.fileExtension.push(files.name.split(".").pop());
          this.playlist.cliplist.push(this.filename.pop() + "." + this.fileExtension.pop());
        }
      }else {
        alert("No .playlist Uploaded!");
      }
    }
  }

  findUmalaute(){
    for(let i = 0; i < this.playlist.cliplist.length; i++){
      for(let j = 0; j < this.notAssignable.length; j++){
        if(this.filename[i].indexOf(this.notAssignable[j]) > -1){
          this.nameCorrect[i] = "Name CORRUPTED!";
        }
      }
    }
  }

  onSave(){
    for(let i = 0; i < this.playlist.cliplist.length; i++){
      // @ts-ignore
      this.playlist.cliplist[i] = document.getElementsByName("files")[i].value + "." + document.getElementsByName("extension")[i].innerText;
      // @ts-ignore
      this.filename[i] = document.getElementsByName("files")[i].value;
      this.fileExtension[i] = document.getElementsByName("extension")[i].innerText;
      this.nameCorrect[i] = document.getElementsByName("correct")[i].innerText;
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

  constructor() { }
}
