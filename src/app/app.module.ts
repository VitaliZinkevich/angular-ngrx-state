import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { BrowserModule } from "@angular/platform-browser";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { appReducers } from "./store/reducers/app.reducers";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { UserEffects } from "./store/effects/user.effects";
import { AppComponent } from "./app.component";
import { UserService } from "./services/user.service";
import { UsersComponent as UsersContainerComponent } from "./containers/users/users.component";
import { UsersComponent } from "./components/users/users.component";
import { UserComponent } from "./containers/user/user.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { storageMetaReducer } from "./store/reducers/storage.metareducer";
@NgModule({
  declarations: [
    AppComponent,
    UsersContainerComponent,
    UsersComponent,
    UserComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers, {
      metaReducers: [storageMetaReducer],
    }),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
