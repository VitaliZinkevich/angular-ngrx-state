import { Action } from "@ngrx/store";

import { IUser } from "../../models/user.interface";

export enum EUserActions {
  GetUsers = "[User] Get Users",
  GetUsersSuccess = "[User] Get Users Success",
  GetUser = "[User] Get User",
  GetUserSuccess = "[User] Get User Success",
  AddUser = "[User] Add User",
  AddUserSuccess = "[User] Add User Success",
  ChangeUserScore = "[User] Change User Score",
  ChangeUserScoreSuccess = "[User] Change User Score Success",
  DeleteUser = "[User] Delete User",
  DeleteUserSuccess = "[User] Delete User Success",
  SortUsers = "[User] Sort Users",
  SortUsersSuccess = "[User] Sort Users Success",
}

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: IUser[]) {}
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

export class AddUser implements Action {
  public readonly type = EUserActions.AddUser;
  constructor(public payload: IUser) {}
}

export class AddUserSuccess implements Action {
  public readonly type = EUserActions.AddUserSuccess;
  constructor(public payload: IUser[]) {}
}

export class ChangeUserScore implements Action {
  public readonly type = EUserActions.ChangeUserScore;
  constructor(public payload: { score: number; id: number }) {}
}

export class ChangeUserScoreSuccess implements Action {
  public readonly type = EUserActions.ChangeUserScoreSuccess;
  constructor(public payload: IUser[]) {}
}
//DeleteUser
export class DeleteUser implements Action {
  public readonly type = EUserActions.DeleteUser;
  constructor(public payload: number) {}
}

export class DeleteUserSuccess implements Action {
  public readonly type = EUserActions.DeleteUserSuccess;
  constructor(public payload: IUser[]) {}
}

export class SortUsers implements Action {
  public readonly type = EUserActions.SortUsers;
  constructor(public payload: { key: string; order: string }) {}
}

export class SortUsersSuccess implements Action {
  public readonly type = EUserActions.SortUsersSuccess;
  constructor(public payload: IUser[]) {}
}

export type UserActions =
  | GetUsers
  | GetUsersSuccess
  | GetUser
  | GetUserSuccess
  | AddUser
  | AddUserSuccess
  | ChangeUserScore
  | ChangeUserScoreSuccess
  | DeleteUser
  | DeleteUserSuccess
  | SortUsers
  | SortUsersSuccess;
