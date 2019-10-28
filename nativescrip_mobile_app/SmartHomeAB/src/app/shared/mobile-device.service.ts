import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BaseService } from "~/app/shared/base.service";

@Injectable({
    providedIn: "root"
})
export class MobileDeviceService extends BaseService {
    /**
     * @param {HttpClient} http
     */
    constructor(protected http: HttpClient) {
       super(http);
    }

    url() {
        return this.serverUrl + "mobile/";
    }

    uuid(id: string) {
//        return this.http.get(this.serverUrl + "mobile-device-uuid/" + id, {headers: this.createRequestHeader()});
        return this.http.get(this.serverUrl + "mobile/uuid/" + id, {headers: this.createRequestHeader()});
    }

}
