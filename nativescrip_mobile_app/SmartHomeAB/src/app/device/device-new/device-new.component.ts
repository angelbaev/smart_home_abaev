import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Subscription } from "rxjs";

import { EventData } from "tns-core-modules/data/observable";
import { Switch } from "tns-core-modules/ui/switch";
import { DeviceService } from "~/app/shared/device.service";
import { Device } from "~/app/shared/model/device.model";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "DeviceNew",
    moduleId: module.id,
    templateUrl: "./device-new.component.html"
})
export class DeviceNewComponent implements OnInit, OnDestroy {

    /**
     * @type {boolean}
     */
    isBusy = false;

    /**
     * @type {Device}
     */
    device: Device;

    /**
     * @type {Subscription}
     */
    private deviceSubscription: Subscription;

    /**
     * @type {any}
     */
    private token: any;

    /**
     * @param deviceService
     * @param storageService
     * @param routerExtensions
     */
    constructor(
        private deviceService: DeviceService,
        private storageService: StorageService,
        private routerExtensions: RouterExtensions
    ) {
    }

    ngOnInit(): void {
        this.device = new Device();
        this.token = this.storageService.getObject("token");
    }

    ngOnDestroy(): void {
        if (this.deviceSubscription) {
            this.deviceSubscription.unsubscribe();
        }
    }

    onSubmit() {
        const data = {
            account:  this.token.account._id,
            name: this.device.name,
            ip: this.device.ip,
            port: this.device.port,
            commands: this.device.commands,
            isActive: this.device.isActive
        };
        this.isBusy = true;
        this.deviceService.create(data).subscribe(
            (result: any) => {
                this.device = new Device();
                this.isBusy = false;
                this.routerExtensions.navigate(["/device"], { clearHistory: true });
            },
            (err: any) => {
                console.log(err);
                this.isBusy = false;
        });
    }

    onBackButtonTap() {
        this.routerExtensions.back();
    }

    /**
     * @param args
     */
    onCheckedChange(args: EventData) {
        const isActiveSwitch = args.object as Switch;
        if (this.device.hasOwnProperty("isActive")) {
            this.device.isActive = isActiveSwitch.checked;
        }
    }
}
