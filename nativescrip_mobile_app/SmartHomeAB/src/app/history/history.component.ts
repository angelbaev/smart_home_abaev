import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ItemEventData } from "tns-core-modules/ui/list-view";

import { AccountService } from "~/app/shared/account.service";
import { StorageService } from "~/app/shared/storage.service";

import { registerElement } from "nativescript-angular";
import { CardView } from "nativescript-cardview";

registerElement("CardView", () => CardView);

@Component({
    selector: "History",
    moduleId: module.id,
    templateUrl: "./history.component.html",
    styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {

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
    histories: Array<any>;

    /**
     * @param accountService
     * @param storageService
     */
    constructor(private accountService: AccountService, private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.token = this.storageService.getObject("token");
        const accountId = this.token.account._id;
        this.isBusy = true;
        this.accountService.history(accountId).subscribe((result: any) => {
            this.histories = result.data;
            this.isBusy = false;
        }, (err: any) => {
            console.log(err);
            this.isBusy = false;
        });
    }

    /**
     * @param args
     */
    onItemTap(args: ItemEventData) {
        //console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.histories[args.index]}`);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
