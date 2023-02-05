import {Component, Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Sortable, { MultiDrag, Swap } from 'sortablejs';
import {PlaylistService} from "../playlist.service";


@Component({
  selector: 'app-json-modifier',
  templateUrl: './json-modifier.component.html',
  styleUrls: ['./json-modifier.component.css']
})
export class JsonModifierComponent implements OnInit{
  keydown: any;
  public userForm:FormGroup;
  public file_name: string = "";
  public file_extension: string = "";
  constructor(public service: PlaylistService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
          file_name: new FormControl(''),
          file_extension: new FormControl(''),
          file_correct: new FormControl(''),
      });
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

  EnterSubmit(event: KeyboardEvent){
    if (event.key === 'Enter') {
      //calling submit method if key pressed is Enter.
      this.service.addNewClipSubmit(this.userForm); 
    } 
  }
  
}
