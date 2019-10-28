import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { Account } from "~/app/shared/model/account.model";

@Injectable({
    providedIn: "root"
})
export class ApiService {
   // private serverUrl = "https://smart-home-abaev.herokuapp.com/";
   private serverUrl = "https://smart-home-abaev.000webhostapp.com/index.php/";

    /**
     * @param {HttpClient} http
     */
   constructor(private http: HttpClient) { }

   wakeupCloudAPI() {
       //const headers = this.createRequestHeader();
        return this.http.get(this.serverUrl);
   }

   login(account: Account) {
        return this.http.post(
            this.serverUrl + "sso/authenticate",
            { username: account.username, password: account.password}
        );
   }

   account(id: string) {
       return this.http.get(this.serverUrl + "account/" + id, {headers: this.createRequestHeader()});
   }

    //v https://www.nativescript.org/blog/tips-on-showing-loading-indicators-in-nativescript-angular-apps
   private createRequestHeader() {
        const token = JSON.parse(appSettings.getString("token"));
        // set headers here e.g.
        const headers = new HttpHeaders({
            Authorization: "Bearer " + token.token,
            "Content-Type": "application/json"
        });

        return headers;
   }


}
