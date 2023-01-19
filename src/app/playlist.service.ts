import { Injectable, Component } from '@angular/core';
import {Playlist} from "./playlist";
import Sortable from "sortablejs";
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlist: Playlist = new Playlist();
  helpActive: boolean = false;
  files:File[] =[];
  playlistFile?: File;
  current: boolean = false;
  playlistFileName: string = "";

  filename: string[] = [];
  fileExtension: string[] = [];

  notAssignable: string[] = ["\u00fc", "\u00e4", "\u00f6", " ", "/", "\u00df", "\u00dc"];
  nameCorrect: string[] = [];
  sortable?:Sortable;

  dublicate: string = "";
  dublicate_file: string = "";
  dublicate_name_corr: string = "";


  getFile(event: EventInit){
    // @ts-ignore
    if(event.target.files.length >= 1) {
      // @ts-ignore
      this.files = event.target.files;
      // @ts-ignore
      if (event.target.files[0].name.split(".").pop() === "playlist") {
        if (this.files) {
          this.playlistFile = (this.files)[0];
          if (this.current) {
            if (confirm("Do you want to replace the current .playlist?")) {
              this.readFile(this.playlistFile);
            } else {
              return;
            }
          } else {
            this.readFile(this.playlistFile);
          }
        }
      } else {
        if (this.current) {
          for (let i = 0; i < this.files.length; i++) {
            this.filename.push((this.files)[i].name.split(".")[0]);
            // @ts-ignore
            this.fileExtension.push(this.files[i].name.split(".").pop());
            this.playlist.cliplist.push(this.filename[i] + "." + this.fileExtension[i]);
            console.log(this.playlist.cliplist);
          }
          this.findUmalaute();
        } else {
          alert("No .playlist Uploaded!");
        }
      }
    }
  }

  readFile(fileToRead: File) {
    // @ts-ignore
    this.playlistFileName = this.playlistFile.name;
    this.playlist.name = this.playlistFileName.split(".playlist")[0];
    const fileReader = new FileReader();
    fileReader.readAsText(fileToRead, "UTF-8");
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

  findUmalaute(){
    this.nameCorrect = [];
    for(let i = 0; i < this.playlist.cliplist.length; i++){
      for(let j = 0; j < this.notAssignable.length; j++){
        if(this.filename[i].indexOf(this.notAssignable[j]) > -1){
          this.nameCorrect[i] = "Name CORRUPTED!";
        }
      }
    }
  }

  onSave(){
    if(this.playlist.cliplist.length > 0){
      try{
        for(let i = 0; i < this.playlist.cliplist.length; i++){
          // @ts-ignore
          this.filename[i] = document.getElementsByName("files")[i].value;
          //console.log(this.filename[i]);
          this.fileExtension[i] = document.getElementsByName("extension")[i].innerText;
          //console.log(this.fileExtension[i]);
          this.nameCorrect[i] = document.getElementsByName("correct")[i].innerText;
          //console.log( this.nameCorrect[i]);
          // @ts-ignore
          this.playlist.cliplist[i] = this.filename[i] + "." + this.fileExtension[i];
        }
        alert("Items saved");
      }catch{
        alert("Error while saving items");
      }finally{
        this.findUmalaute();
      }
    }
  }

  onExport(){
    //console.log(this.playlistFileName.split(".").length);
    if(this.playlistFileName.split(".").length < 3){
      //this.playlist.name = this.playlistFileName.split(".")[0];
    }else{
      alert("Filename of .playlist is corrupted");
      return;
    }

    var sJson = JSON.stringify(this.playlist);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', this.playlist.name + ".playlist");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  onHelp(){
    confirm("INFO \nChecks filenames for not allowed characters. Displays filename extensions. Can save  and export new ordered playlist.")
    //this.helpActive = !this.helpActive;
  }

  onDelete(index: number){
    try {
      if (index > -1) {
        this.filename.splice(index, 1);
        this.fileExtension.splice(index, 1);
        this.nameCorrect.splice(index, 1);
        this.playlist.cliplist.splice(index, 1);
      }
    }finally {
      console.log("Removed " + index + " item");
    }
  }

  onDeleteAll(){
    try{
      this.playlist.cliplist = [];
      
    }finally{
      console.log("Cliplist cleared!");
    }
  }

  onDublicate(index: number){
    try{
      if(index > -1){
        this.dublicate = this.playlist.cliplist[index];
        this.playlist.cliplist.splice(index + 1, 0, this.dublicate);

        this.dublicate_file = this.filename[index];
        this.filename.splice(index + 1, 0, this.dublicate_file);

        this.dublicate_name_corr = this.nameCorrect[index];
        this.nameCorrect.splice(index + 1, 0, this.dublicate_name_corr);

        this.findUmalaute();
        console.log("Dublicated" + index +  " File");
      }
    }catch{
      alert("Error while dublicating");
    }
  }

  addNewClipSubmit(form: FormGroup){
    console.log("Filename lenght: " + this.filename.length + "file extension: " + this.fileExtension.length + "Name Correct Length: " + this.nameCorrect.length +"Playlist lenght: " +  this.playlist.cliplist.length);
    this.filename.push(form.controls['file_name'].value); 
    console.log(form.controls['file_extension'].value);
    this.fileExtension.push(form.controls['file_extension'].value);
    this.nameCorrect.push("");
    this.playlist.cliplist.push(form.controls['file_name'].value + "." + form.controls['file_extension'].value);
    this.findUmalaute();
    this.onSave();
    console.log("Filename lenght: " + this.filename.length + "file extension: " + this.fileExtension.length + "Name Correct Length: " + this.nameCorrect.length +"Playlist lenght: " +  this.playlist.cliplist.length);
  }

  constructor() { }
}
