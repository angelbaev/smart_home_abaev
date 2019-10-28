import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";
import { Subscription } from "rxjs";

import { ActivatedRoute } from "@angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { Switch } from "tns-core-modules/ui/switch";
import { DeviceService } from "~/app/shared/device.service";
import { Device } from "~/app/shared/model/device.model";

@Component({
    selector: "DeviceSingle",
    moduleId: module.id,
    templateUrl: "./device-single.component.html"
})
export class DeviceSingleComponent implements OnInit, OnDestroy {

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
     * @type {string}
     */
    private deviceId: string;

    /**
     * @param deviceService
     * @param routerExtensions
     * @param route
     */
    constructor(
        private deviceService: DeviceService,
        private routerExtensions: RouterExtensions,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.deviceId = params.id;
        });

        this.isBusy = true;
        this.deviceSubscription = this.deviceService.view(this.deviceId).subscribe(
            (result: any) => {
                this.device = result.data;
                this.isBusy = false;
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

    onSubmit() {
        const data = {
            account: this.device.account,
            name: this.device.name,
            ip: this.device.ip,
            port: this.device.port,
            commands: this.device.commands,
            isActive: this.device.isActive
        };
        this.isBusy = true;
        this.deviceService.update(this.device._id, data).subscribe(
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

    onCheckedChange(args: EventData) {
        const isActiveSwitch = args.object as Switch;
        if (this.device.hasOwnProperty("isActive")) {
            this.device.isActive = isActiveSwitch.checked;
        }
    }

    onControlList() {
        this.routerExtensions.navigate(["/device/control-list", this.device._id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
