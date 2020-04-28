import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { IUser } from "../../models/user.interface";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
  @Output()
  addUserToList: EventEmitter<IUser> = new EventEmitter();
  @Output()
  changeUserScore: EventEmitter<{
    score: number;
    id: number;
  }> = new EventEmitter();
  @Output()
  deleteUserEmmiter: EventEmitter<number> = new EventEmitter();
  @Output()
  sort: EventEmitter<{ key: string; order: string }> = new EventEmitter();
  userForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });
  // userFormValues$;

  constructor() {
    // this.userFormValues$ = this.userForm.valueChanges.subscribe((form) => {});
  }

  ngOnInit() {}

  public ngOnDestroy() {
    // this.userFormValues$.unsubscribe();
  }

  somethingChangedAtScores(event, userId) {
    this.changeUserScore.emit({ score: event.target.value, id: userId });
  }
  sortUp(col: string) {
    this.sort.emit({ key: col, order: "+" });
  }
  sortDown(col: string) {
    this.sort.emit({ key: col, order: "-" });
  }
  incrementScore(score, userId) {
    this.changeUserScore.emit({ score: +score + 1, id: userId });
  }
  decrementScore(score, userId) {
    this.changeUserScore.emit({ score: +score - 1, id: userId });
  }
  deleteUser(id: number) {
    this.deleteUserEmmiter.emit(id);
  }
  navigateToUser(id: number) {
    this.userSelected.emit(id);
  }
  addUser() {
    if (this.userForm.valid) {
      let user: IUser = {
        id: new Date().getTime(),
        name: this.userForm.value.name,
        creationDate: new Date().toString(),
        score: 0,
      };
      this.addUserToList.emit(user);
      this.userForm.reset();
    }
  }
}
