import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { device } from "tns-core-modules/platform";

import { MobileDeviceService } from "~/app/shared/mobile-device.service";
import { MobileDevice } from "~/app/shared/model/mobile-device.model";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "Phone",
    moduleId: module.id,
    templateUrl: "./phone.component.html"
})
export class PhoneComponent implements OnInit {

    /**
     * @type {MobileDevice}
     */
    mobileDevice: MobileDevice;

    /**
     * @type {boolean}
     */
    isBusy = false;

    /**
     * @param mobileDeviceService
     * @param storageService
     */
    constructor(private mobileDeviceService: MobileDeviceService, private storageService: StorageService) {
    }

    ngOnInit(): void {
        const token = this.storageService.getObject("token");
        const accountId = token.account._id;

        this.isBusy = true;
        this.mobileDeviceService.uuid(device.uuid).subscribe((result: any) => {
                if (result.data === null || result.data.length === 0) {
                    this.mobileDeviceService.create({
                        account: accountId,
                        model: device.model,
                        type:  device.deviceType,
                        uuid: device.uuid
                    }).subscribe((res: any) => {
                        this.mobileDevice = res.data;
                        this.storageService.setString("mobileDeviceId", res.data._id);
                        this.isBusy = false;
                    }, (err: any) => {
                        console.log(err);
                        this.isBusy = false;
                    });
                } else {
                    this.mobileDevice = result.data;
                    this.isBusy = false;
                }
            },
            (err: any) => {
                console.log(err);
                this.isBusy = false;
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
