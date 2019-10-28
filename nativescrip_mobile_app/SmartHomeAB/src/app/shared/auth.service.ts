import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Account } from "~/app/shared/model/account.model";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    // private serverUrl = "https://smart-home-abaev.herokuapp.com/";
   private serverUrl = "https://smart-home-abaev.000webhostapp.com/index.php/";

    /**
     * @param {HttpClient} http
     */
   constructor(private http: HttpClient) { }

   login(account: Account) {
        return this.http.post(
            this.serverUrl + "sso/authenticate",
            { username: account.username, password: account.password}
        );
   }
 }
