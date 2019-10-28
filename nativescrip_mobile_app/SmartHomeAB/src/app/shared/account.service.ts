import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BaseService } from "~/app/shared/base.service";

@Injectable({
    providedIn: "root"
})
export class AccountService extends BaseService {
    /**
     * @param {HttpClient} http
     */
    constructor(protected http: HttpClient) {
       super(http);
    }

    url() {
        return this.serverUrl + "account/";
    }

    history(id: string) {
        return this.http.get(this.url() + id + "/history", {headers: this.createRequestHeader()});
    }

    device(id: string) {
        return this.http.get(this.url() + id + "/device", {headers: this.createRequestHeader()});
    }

    control(id: string) {
        return this.http.get(this.url() + id + "/control", {headers: this.createRequestHeader()});
    }
}
