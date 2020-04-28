import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { IUser } from "../../models/user.interface";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  @Input()
  users: IUser[];
  @Output()
  userSelected: EventEmitter<number> = new EventEmitter();
  userForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });
  addUserToContainer: EventEmitter<IUser> = new EventEmitter();
  userFormValues$ = this.userForm.valueChanges;
  constructor() {}

  ngOnInit() {}

  navigateToUser(id: number) {
    this.userSelected.emit(id);
  }
  addUser(user) {
    console.log(this.userForm.value);
  }
}
