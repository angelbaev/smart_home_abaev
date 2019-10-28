import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AlertService {
    static alert(message: string) {
        return alert({
            title: "Smart Home",
            okButtonText: "OK",
            message
        });
    }
}
