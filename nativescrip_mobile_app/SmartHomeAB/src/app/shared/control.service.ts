import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BaseService } from "~/app/shared/base.service";

@Injectable({
    providedIn: "root"
})
export class ControlService extends BaseService {
    /**
     * @param {HttpClient} http
     */
    constructor(protected http: HttpClient) {
       super(http);
    }

    url() {
        return this.serverUrl + "control/";
    }
}
