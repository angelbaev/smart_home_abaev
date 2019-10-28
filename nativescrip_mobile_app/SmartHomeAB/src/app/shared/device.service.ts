import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BaseService } from "~/app/shared/base.service";

@Injectable({
    providedIn: "root"
})
export class DeviceService extends BaseService {
    /**
     * @param {HttpClient} http
     */
    constructor(protected http: HttpClient) {
       super(http);
    }

    url() {
        return this.serverUrl + "device/";
    }

    control(id: string) {
        return this.http.get(this.url() + id + "/control", {headers: this.createRequestHeader()});
    }
}
