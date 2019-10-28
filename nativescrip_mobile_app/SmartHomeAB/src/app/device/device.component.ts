import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import * as app from "tns-core-modules/application";
import { ItemEventData } from "tns-core-modules/ui/list-view";

import { AccountService } from "~/app/shared/account.service";
import { Device } from "~/app/shared/model/device.model";
import { Token } from "~/app/shared/model/token.model";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "Device",
    moduleId: module.id,
    templateUrl: "./device.component.html",
    styleUrls: ["./device.component.css"]
})
export class DeviceComponent implements OnInit, OnDestroy {

    /**
     * @type {boolean}
     */
    isBusy = false;

    /**
     * @type {Array<Device>}
     */
    devices: Array<Device> = [];

    /**
     * @type {Subscription}
     */
    private accountSubscription: Subscription;
    /**
     * @type {Token}
     */
    private token: Token;

    /**
     * @param accountService
     * @param storageService
     * @param routerExtensions
     */
    constructor(
        private accountService: AccountService,
        private storageService: StorageService,
        private routerExtensions: RouterExtensions
    ) {
    }

    ngOnInit(): void {
        this.token = this.storageService.getObject("token");
        this.isBusy = true;
        this.accountSubscription = this.accountService.device(this.token.account._id).subscribe(
            (result: any) => {
                this.isBusy = false;
                this.devices = result.data;
            },
            (err: any) => {
                console.log(err);
                this.isBusy = false;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.accountSubscription) {
            this.accountSubscription.unsubscribe();
        }
    }

    /**
     * @param args
     */
    onDeviceItemTap(args: ItemEventData): void {
        const selected = this.devices[args.index];
        this.routerExtensions.navigate(["/device/device-single", selected._id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    onCreateNewTap() {
        this.routerExtensions.navigate(["/device/device-new"],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
