import { GetUsers } from "./../../store/actions/user.actions";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { IAppState } from "../../store/state/app.state";
import { selectUserList } from "../../store/selectors/user.selector";
import { Router } from "@angular/router";
import { IUser } from "../../models/user.interface";
import {
  AddUser,
  ChangeUserScore,
  DeleteUser,
  SortUsers,
} from "../../store/actions/user.actions";
@Component({
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users$ = this._store.pipe(select(selectUserList));

  constructor(private _store: Store<IAppState>, private _router: Router) {}

  ngOnInit() {
    this._store.dispatch(new GetUsers());
  }

  navigateToUser(id: number) {
    this._router.navigate(["user", id]);
  }

  addUser(user: IUser) {
    this._store.dispatch(new AddUser(user));
  }
  changeUserScore(data) {
    this._store.dispatch(new ChangeUserScore(data));
  }
  deleteUser(id) {
    this._store.dispatch(new DeleteUser(id));
  }
  sort({ key, order }) {
    this._store.dispatch(new SortUsers({ key, order }));
  }
}
