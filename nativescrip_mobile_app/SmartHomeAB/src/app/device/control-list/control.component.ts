import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Subscription } from "rxjs";
import { ItemEventData } from "tns-core-modules/ui/list-view";

import { ActivatedRoute } from "@angular/router";
import { DeviceService } from "~/app/shared/device.service";
import { Control } from "~/app/shared/model/control.model";
import { StorageService } from "~/app/shared/storage.service";

@Component({
    selector: "Control",
    moduleId: module.id,
    templateUrl: "./control.component.html",
    styleUrls: ["./control.component.css"]
})
export class ControlComponent implements OnInit, OnDestroy {

    /**
     * @type {boolean}
     */
    isBusy = false;

    /**
     * @type {Array<Control>}
     */
    controls: Array<Control> = [];

    /**
     * @type {Subscription}
     */
    private deviceSubscription: Subscription;

    /**
     * @type {string}
     */
    private deviceId: string;

    /**
     * @param deviceService
     * @param storageService
     * @param routerExtensions
     * @param route
     */
    constructor(
        private deviceService: DeviceService,
        private storageService: StorageService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.deviceId = params.id;
        });

        this.isBusy = true;
        this.deviceSubscription = this.deviceService.control(this.deviceId).subscribe(
            (result: any) => {
                this.isBusy = false;
                this.controls = result.data;
            },
            (err: any) => {
                console.log(err);
                this.isBusy = false;
            }
        );
    }

    ngOnDestroy(): void {
        if (this.deviceSubscription) {
            this.deviceSubscription.unsubscribe();
        }
    }

    /**
     * @param args
     */
    onDeviceItemTap(args: ItemEventData): void {
        const selected = this.controls[args.index];
        this.routerExtensions.navigate(["/device/control-single", selected._id],
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
        this.routerExtensions.navigate(["/device/control-new", this.deviceId],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    onBackButtonTap() {
        this.routerExtensions.back();
    }
}
