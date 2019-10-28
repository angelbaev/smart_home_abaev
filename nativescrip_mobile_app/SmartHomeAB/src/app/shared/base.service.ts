import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable({
    providedIn: "root"
})
export class BaseService {
   // protected serverUrl = "https://smart-home-abaev.herokuapp.com/";
   protected serverUrl = "https://smart-home-abaev.000webhostapp.com/index.php/";

    /**
     * @param {HttpClient} http
     */
   constructor(protected http: HttpClient) { }

   url() {
       return this.serverUrl;
   }

   index() {
       return this.http.get(this.url(), {headers: this.createRequestHeader()});
   }

   view(id: string) {
       console.log(this.url() + id);
       return this.http.get(this.url() + id, {headers: this.createRequestHeader()});
   }

   create(data: any) {
        return this.http.post(this.url(), data, {headers: this.createRequestHeader()});
   }

   update(id: string, data: any) {
       return this.http.put(this.url() + id, data, {headers: this.createRequestHeader()});
   }

   delete(id: string) {
       return this.http.delete(this.url() + id, {headers: this.createRequestHeader()});
   }

    //v https://www.nativescript.org/blog/tips-on-showing-loading-indicators-in-nativescript-angular-apps
   protected createRequestHeader() {
        const token = JSON.parse(appSettings.getString("token"));

        // set headers here e.g.
        const headers = new HttpHeaders({
            "Authorization": "Bearer " + token.token,
            "Content-Type": "application/json"
        });

        return headers;
   }
}
