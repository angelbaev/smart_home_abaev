import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { AccountService } from "~/app/shared/account.service";
import { AlertService } from "~/app/shared/alert.service";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    /**
     * @type {any}
     */
    token: any;

    /**
     * @type {any}
     */
    account: any;

    /**
     * @type {boolean}
     */
    isBusy = false;

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

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

        this.account = {
            username: "",
            password: "",
            confirmPassword: ""
        };
        this.accountService.view(accountId).subscribe(
            (result: any) => {
                this.account = result.data;
                this.account.confirmPassword = "";
                this.isBusy = false;
            },
            (err) => {
                console.log(err);
                this.isBusy = false;
        });
    }

    onSubmit() {
        if (!this.account.password || !this.account.confirmPassword) {
            AlertService.alert("Моля попълнете двете полета парола и повърждение на паролата.");

            return;
        }
        if (this.account.password  !== this.account.confirmPassword) {
            AlertService.alert("Паролите не съвпадат.");

            return;
        }
        /*
        const accountId = this.token.account._id;
        this.accountService.update(accountId,
            {username: this.account.username, password: this.account.password, isActive: this.account.isActive}
        ).subscribe((result: any) => {

        }, (err: any) => {

        });
        */
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
