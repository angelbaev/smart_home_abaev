import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { device } from "tns-core-modules/platform";

import { EventData } from "tns-core-modules/data/observable";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { AccountService } from "~/app/shared/account.service";
import { ActionService } from "~/app/shared/action.service";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    /**
     * @type {any}
     */
    token: any;

    /**
     * @type {boolean}
     */
    isBusy = false;

    /**
     * @type {Array<any>}
     */
    controls: Array<any>;

    /**
     * @type {Array<any>}
     */
    controlNames: Array<any> = [];

    /**
     * @type {any}
     */
    selected: any;

    /**
     * @type {number}
     */
    selectedIndex: number = 0;

    /**
     * @param accountService
     * @param actionService
     * @param storageService
     */
    constructor(
        private accountService: AccountService,
        private actionService: ActionService,
        private storageService: StorageService
    ) {
    }

    ngOnInit(): void {
        this.token = this.storageService.getObject("token");
        this.load();
    }

    /**
     * @param args
     */
    onSubmit(args: EventData) {
        if (this.selected.hasOwnProperty("state")) {
            this.isBusy = true;
            if (this.selected.state === "off") {
                this.actionService.on(
                    this.selected._id,
                    (this.storageService.getString("mobileDeviceId") || device.uuid)
                ).subscribe((result: any) => {
                    this.load();
                }, (err: any) => {
                    console.log(err);
                    this.isBusy = false;
                });
            } else {
                this.actionService.off(
                    this.selected._id,
                    (this.storageService.getString("mobileDeviceId") || device.uuid)
                ).subscribe((result: any) => {
                    this.load();
                }, (err: any) => {
                    console.log(err);
                    this.isBusy = false;
                });
            }
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    /**
     * @param args
     */
    onSelectedIndexChanged(args: EventData) {
        const picker = <ListPicker>args.object;
        this.selected = this.controls[picker.selectedIndex];
        this.selectedIndex = picker.selectedIndex;
    }

    private load() {
        this.isBusy = true;
        this.controls = [];
        this.controlNames = [];
        this.selected = null;
        this.accountService.control(this.token.account._id).subscribe((result: any) => {
            this.controls = result.data;
            if (this.controls.length > 0) {
                this.selected = this.controls[0];
            }
            this.controls.forEach((item) => {
                this.controlNames.push(item.name);
            });

            this.isBusy = false;
        }, (err: any) => {
            console.log(err);
            this.isBusy = false;
        });
    }
}
