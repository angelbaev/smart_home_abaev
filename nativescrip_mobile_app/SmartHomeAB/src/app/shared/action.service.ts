import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BaseService } from "~/app/shared/base.service";

@Injectable({
    providedIn: "root"
})
export class ActionService extends BaseService {
    /**
     * @param {HttpClient} http
     */
    constructor(protected http: HttpClient) {
       super(http);
    }

    url() {
        return this.serverUrl;
    }

    on(contorlId: string, mobileId: string) {
        return this.http.post(
            this.url() + "action/on",
            {control: contorlId, mobile: mobileId},
            {headers: this.createRequestHeader()}
        );
    }

    off(contorlId: string, mobileId: string) {
        return this.http.post(
            this.url() + "action/off",
            {control: contorlId, mobile: mobileId},
            {headers: this.createRequestHeader()}
        );
    }
}
