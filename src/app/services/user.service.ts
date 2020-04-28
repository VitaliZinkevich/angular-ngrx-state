import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { IUser } from "../models/user.interface";
import { IAppState } from "../store/state/app.state";
import { selectUserList } from "../store/selectors/user.selector";
@Injectable()
export class UserService {
  usersUrl = `${environment.apiUrl}users.json`;
  constructor(private _store: Store<IAppState>, private _http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.usersUrl);
  }
}
