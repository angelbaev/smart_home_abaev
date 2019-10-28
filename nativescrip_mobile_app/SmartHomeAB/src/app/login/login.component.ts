import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { AlertService } from "~/app/shared/alert.service";
import { AuthService } from "~/app/shared/auth.service";
import { Account } from "~/app/shared/model/account.model";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    /**
     * @type {boolean}
     */
    isBusy = false;

    /**
     * @type {Account}
     */
    account: Account;

    @ViewChild("password") password: ElementRef;

    /**
     * @param authService
     * @param storageService
     * @param router
     */
    constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
        this.account = new Account();
    }

    ngOnInit(): void {
        if (this.storageService.hasKey("account")) {
            this.account = this.storageService.getObject("account");
            this.login();
            // this.router.navigate(["/home"]);
        }
    }

    focusPassword() {
        // this.account.password.nativeElement.focus();
    }

    submit() {
        if (!this.account.username || !this.account.password) {
            AlertService.alert("Please provide both an username and password.");

            return;
        }

        this.login();
    }

    login() {
        this.isBusy = true;
        this.authService.login(this.account).subscribe((result: any) => {
            this.storageService.setObject("account", this.account);
            this.storageService.setObject("token", result.data);
            this.storageService.setBoolean("authenticated", true);

            // @ts-ignore
            this.router.navigate(["/home"], { clearHistory: true });
            this.isBusy = false;
        }, (error) => {
            AlertService.alert("Unfortunately we could not find your account.");
            this.isBusy = false;
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
