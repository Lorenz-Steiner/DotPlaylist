import { Injectable, Component } from '@angular/core';
import {Playlist} from "./playlist";
import Sortable from "sortablejs";
import { Form, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlist: Playlist = new Playlist();

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
  dublicate_extension: string = "";

  helpActive: boolean = false;
  alertsDisabled: boolean = false;


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
          if(!this.alertsDisabled){
            alert("No .playlist Uploaded!");
          }
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
        if(!this.alertsDisabled){
          alert("Items saved");
        } 
      }catch{
        if(!this.alertsDisabled){
          alert("Error while saving items");
        }
      }finally{
        this.findUmalaute();
        this.showArrays();
      }
    }
  }

  onExport(){
    //console.log(this.playlistFileName.split(".").length);
    if(this.playlistFileName.split(".").length < 3){
      //this.playlist.name = this.playlistFileName.split(".")[0];
    }else{
      if(!this.alertsDisabled){
        alert("Filename of .playlist is corrupted");
        return;
      }
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
      this.showArrays();
    }
  }

  onDeleteAll(){
    try{
      this.playlist.cliplist = [];
      this.filename = [];
      this.fileExtension = [];
    }finally{
      console.log("Cliplist cleared!");
      this.showArrays();
    }
  }

  onDublicate(index: number){
    try{
      if(index > -1){
        this.dublicate = this.playlist.cliplist[index];
        this.playlist.cliplist.splice(index + 1, 0, this.dublicate);

        this.dublicate_file = this.filename[index];
        this.filename.splice(index + 1, 0, this.dublicate_file);

        this.dublicate_extension = this.fileExtension[index];
        this.fileExtension.splice(index + 1, 0, this.dublicate_extension);

        this.dublicate_name_corr = this.nameCorrect[index];
        this.nameCorrect.splice(index + 1, 0, this.dublicate_name_corr);

        this.findUmalaute();
        console.log("Dublicated" + index +  " File");
        this.showArrays();
      }
    }catch{
      if(!this.alertsDisabled){
        alert("Error while dublicating");
      }
    }
  }

  addNewClipSubmit(form: FormGroup){
    this.showArrays();
    this.filename.push(form.controls['file_name'].value); 
    console.log(form.controls['file_extension'].value);
    this.fileExtension.push(form.controls['file_extension'].value);
    this.nameCorrect.push("Valid");
    this.playlist.cliplist.push(form.controls['file_name'].value + "." + form.controls['file_extension'].value);
    //this.findUmalaute();
    //this.onSave();
    this.showArrays();
  }

  showArrays(){
    console.log("Filename lenght: " + this.filename.length + " file extension: " + this.fileExtension.length + " Name Correct Length: " + this.nameCorrect.length +" Playlist lenght: " +  this.playlist.cliplist.length);
  }

  disableAlerts(){
    this.alertsDisabled = !this.alertsDisabled;
  }


  constructor() { }
}
