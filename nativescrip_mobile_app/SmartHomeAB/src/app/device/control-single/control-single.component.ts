import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Subscription } from "rxjs";

import { ActivatedRoute } from "@angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { Switch } from "tns-core-modules/ui/switch";
import { ControlService } from "~/app/shared/control.service";
import { Control } from "~/app/shared/model/control.model";

@Component({
    selector: "ControlSingle",
    moduleId: module.id,
    templateUrl: "./control-single.component.html"
})
export class ControlSingleComponent implements OnInit, OnDestroy {

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
    private controlId: string;

    /**
     * @param controlService
     * @param routerExtensions
     * @param route
     */
    constructor(
        private controlService: ControlService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.controlId = params.id;
        });

        this.isBusy = true;
        this.controlSubscription = this.controlService.view(this.controlId).subscribe(
            (result: any) => {
                this.control = result.data;
                this.isBusy = false;
            },
            (err: any) => {
                console.log(err);
                this.isBusy = false;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.controlSubscription) {
            this.controlSubscription.unsubscribe();
        }
    }

    onSubmit() {
        const data = {
            device:  this.control.device._id,
            name: this.control.name,
            commandOn: this.control.commandOn,
            commandOff: this.control.commandOff,
            state: "off",
            isActive: this.control.isActive
        };

        this.isBusy = true;
        this.controlService.update(this.control._id, data).subscribe(
            (result: any) => {
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
