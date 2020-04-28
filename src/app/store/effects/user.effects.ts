import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { of } from "rxjs";
import { switchMap, map, withLatestFrom } from "rxjs/operators";

import { IAppState } from "../state/app.state";
import {
  GetUsersSuccess,
  EUserActions,
  GetUserSuccess,
  GetUser,
  GetUsers,
  AddUser,
  AddUserSuccess,
  ChangeUserScoreSuccess,
  DeleteUser,
  DeleteUserSuccess,
  SortUsers,
  SortUsersSuccess,
} from "../actions/user.actions";
import { UserService } from "../../services/user.service";
import { selectUserList } from "../selectors/user.selector";
import { IUser } from "../../models/user.interface";

@Injectable()
export class UserEffects {
  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const selectedUser = users.filter((user) => user.id === +id)[0];
      return of(new GetUserSuccess(selectedUser));
    })
  );

  @Effect()
  getUsers$ = this._actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      if (users && users.length) {
        return of(users);
      } else {
        return this._userService.getUsers();
      }
    }),
    switchMap((userHttp: IUser[]) => of(new GetUsersSuccess(userHttp)))
  );

  @Effect()
  addUser$ = this._actions$.pipe(
    ofType<AddUser>(EUserActions.AddUser),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([user, users]) => {
      users.push(user);
      return of(new AddUserSuccess(users));
    })
  );

  @Effect()
  changeUserScore$ = this._actions$.pipe(
    ofType<AddUser>(EUserActions.ChangeUserScore),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([data, users]) => {
      const newScoreToUser = users.find((user) => user.id === data.id);
      newScoreToUser.score = data.score;
      return of(new ChangeUserScoreSuccess(users));
    })
  );

  @Effect()
  deleteUser$ = this._actions$.pipe(
    ofType<DeleteUser>(EUserActions.DeleteUser),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([id, users]) => {
      const newUsers = users.filter((user) => user.id !== id);
      return of(new DeleteUserSuccess(newUsers));
    })
  );

  @Effect()
  sortUsers$ = this._actions$.pipe(
    ofType<SortUsers>(EUserActions.SortUsers),
    map((action) => action.payload),
    withLatestFrom(this._store.pipe(select(selectUserList))),
    switchMap(([data, users]) => {
      if (data.key === "name") {
        if (data.order === "+") {
          users.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
              return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          });
        } else {
          users.sort((a, b) => {
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
              return -1;
            }
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          });
        }
      }
      if (data.key === "creationDate") {
        users.sort((a, b) => {
          if (data.order === "+") {
            return (
              new Date(b[data.key]).getTime() - new Date(a[data.key]).getTime()
            );
          } else {
            return (
              new Date(a[data.key]).getTime() - new Date(b[data.key]).getTime()
            );
          }
        });
      }
      if (data.key === "id" || data.key === "score") {
        users.sort((a, b) => {
          if (data.order === "+") {
            return b[data.key] - a[data.key];
          } else {
            return a[data.key] - b[data.key];
          }
        });
      }
      return of(new SortUsersSuccess(users));
    })
  );

  constructor(
    private _userService: UserService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
