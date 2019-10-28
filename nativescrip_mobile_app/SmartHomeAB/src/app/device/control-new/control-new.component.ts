import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Subscription } from "rxjs";

import { EventData } from "tns-core-modules/data/observable";
import { Switch } from "tns-core-modules/ui/switch";
import { ControlService } from "~/app/shared/control.service";
import { Control } from "~/app/shared/model/control.model";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "ControlNew",
    moduleId: module.id,
    templateUrl: "./control-new.component.html"
})
export class ControlNewComponent implements OnInit, OnDestroy {

    /**
     * @type {boolean}
     */
    isBusy = false;

    /**
     * @type {Control}
     */
    control: Control;

    /**
     * @type {Subscription}
     */
    private controlSubscription: Subscription;

    /**
     * @type {string}
     */
    private deviceId: string;

    /**
     * @param controlService
     * @param storageService
     * @param routerExtensions
     * @param route
     */
    constructor(
        private controlService: ControlService,
        private storageService: StorageService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.deviceId = params.device_id;
        });

        this.control = new Control();
    }

    ngOnDestroy(): void {
        if (this.controlSubscription) {
            this.controlSubscription.unsubscribe();
        }
    }

    onSubmit() {
        const data = {
            device:  this.deviceId,
            name: this.control.name,
            commandOn: this.control.commandOn,
            commandOff: this.control.commandOff,
            state: "off",
            isActive: this.control.isActive
        };

        this.isBusy = true;
        this.controlService.create(data).subscribe(
            (result: any) => {
                this.control = new Control();
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
        if (this.control.hasOwnProperty("isActive")) {
            this.control.isActive = isActiveSwitch.checked;
        }
    }
}
